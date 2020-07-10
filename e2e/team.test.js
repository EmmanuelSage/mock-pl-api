import request from 'supertest'
import app from '../src/app'
import mock from './fixtures/mock'
import Team from '../src/models/team'
import Fixture from '../src/models/fixture'
import User from '../src/models/user'
import {seedTeamAdmin, seedTeamUser} from './fixtures/seeder'

let adminUser
let user
let teamId

beforeAll(async () => {
  jest.setTimeout(20000)
  await Team.deleteMany()
  await Fixture.deleteMany()
  await User.deleteMany()
  adminUser = await seedTeamAdmin()
  user = await seedTeamUser()
})

describe('Create Team', () => {
  it('should successfully create a team', async () => {
    const res = await request(app)
      .post('/teams')
      .set('authorization', `Bearer ${adminUser.token}`)
      .send({
        ...mock.team,
      })
    expect(res.body.status).toEqual(201)
    expect(res.body.message).toEqual('Team was created')
    expect(res.body.data.name).toEqual(mock.team.name)
    teamId = res.body.data._id
  })

  it('should not create a team as a user', async () => {
    const res = await request(app)
      .post('/teams')
      .set('authorization', `Bearer ${user.token}`)
      .send({
        ...mock.team,
      })
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })
})

describe('View Teams', () => {
  it('should successfully get all teams from the server', async () => {
    const res = await request(app)
      .get('/teams')
      .set('authorization', `Bearer ${adminUser.token}`)
    expect(res.body.status).toEqual(200)
    expect(res.body.source).toEqual('server')
  })
})

describe('Update Team', () => {
  it('should successfully update a team', async () => {
    const teamData = {name: 'Manchester United FC'}
    const res = await request(app)
      .patch(`/teams/${teamId}`)
      .set('authorization', `Bearer ${adminUser.token}`)
      .send(teamData)
    expect(res.body.status).toEqual(200)
    expect(res.body.message).toEqual('Team was created')
    expect(res.body.data.name).toEqual(teamData.name)
  })

  it('should not update the team as a user', async () => {
    const res = await request(app)
      .patch(`/teams/${teamId}`)
      .set('authorization', `Bearer ${user.token}`)
      .send({
        name: 'Newcastle United FC',
      })
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })

  it('should not find the team to be updated', async () => {
    const res = await request(app)
      .patch('/teams/5f06df030a0ce8352ec1f991')
      .set('authorization', `Bearer ${adminUser.token}`)
      .send({
        name: 'Tottenham Hotspur FC',
      })
    expect(res.body.status).toEqual(500)
    expect(res.body.error).toEqual('Team does not exist')
  })
})

describe('Delete Team', () => {
  it('should successfully delete a team', async () => {
    const res = await request(app)
      .delete(`/teams/${teamId}`)
      .set('authorization', `Bearer ${adminUser.token}`)
    expect(res.body.status).toEqual(200)
    expect(res.body.message).toEqual('Team deleted')
  })

  it('should not delete the team as a user', async () => {
    const res = await request(app)
      .delete(`/teams/${teamId}`)
      .set('authorization', `Bearer ${user.token}`)
    expect(res.body.status).toEqual(403)
    expect(res.body.error).toEqual('Admin Authorization needed')
  })
})
