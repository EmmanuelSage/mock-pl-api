/* eslint-disable no-underscore-dangle */
import request from 'supertest'
import app from '../src/app'
import mock from './fixtures/mock'
import Fixture from '../src/models/user'
import Team from '../src/models/team'
import {seedFixtureAdmin, seedFixtureUser, seedTeams} from './fixtures/seeder'

let adminUser
let user
let fixtureId
let seededTeams
let dataTosend

beforeAll(async () => {
  jest.setTimeout(20000)
  await Fixture.deleteMany()
  await Team.deleteMany()
  adminUser = await seedFixtureAdmin()
  user = await seedFixtureUser()
  seededTeams = await seedTeams()
  dataTosend = {
    homeTeam: seededTeams[0]._id.toString(),
    awayTeam: seededTeams[1]._id.toString(),
    ...mock.fixture,
  }
})

describe('Create Fixture', () => {
  it('should create a fixture as an admin', async () => {
    const res = await request(app)
      .post('/fixtures')
      .set('authorization', `Bearer ${adminUser.token}`)
      .send(dataTosend)
    expect(res.body.status).toEqual(201)
    expect(res.body.message).toEqual('Fixture was successfully created')
    fixtureId = res.body.data._id
  })

  it('should not create a fixture as a user', async () => {
    const res = await request(app)
      .post('/fixtures')
      .set('authorization', `Bearer ${user.token}`)
      .send(dataTosend)
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })
})

describe('View Fixtures', () => {
  it('should get all fixtures with pending=true query', async () => {
    const res = await request(app)
      .get('/fixtures?pending=true')
      .set('authorization', `Bearer ${adminUser.token}`)
    expect(res.body.status).toEqual(200)
  })

  it('should get all fixtures with pending=false query', async () => {
    const res = await request(app)
      .get('/fixtures?pending=false')
      .set('authorization', `Bearer ${adminUser.token}`)
    expect(res.body.status).toEqual(200)
  })
})
describe('Update Fixture', () => {
  it('should successfully update a fixture', async () => {
    const {matchDate, ...fixtureData} = dataTosend
    const res = await request(app)
      .patch(`/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${adminUser.token}`)
      .send({
        matchDate: '2025-02-05',
        ...fixtureData,
      })
    expect(res.body.status).toEqual(200)
    expect(res.body.message).toEqual('Fixture was successfully updated')
  })
  it('should not update the fixture as a user', async () => {
    const {matchDate, ...fixtureData} = dataTosend
    const res = await request(app)
      .patch(`/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${user.token}`)
      .send({
        matchDate: '2026-02-05',
        ...fixtureData,
      })
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })
})

describe('Delete Fixture', () => {
  it('should successfully delete a fixture', async () => {
    const res = await request(app)
      .delete(`/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${adminUser.token}`)
    expect(res.body.status).toEqual(200)
  })
  it('should not delete the fixture as a user', async () => {
    const res = await request(app)
      .delete(`/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${user.token}`)
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })
})
