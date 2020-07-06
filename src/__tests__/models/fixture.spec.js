import mongoose from 'mongoose'
import Fixture from '../../models/fixture'

describe('Fixture model tests', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  const fixtureData = {
    matchDate: new Date('2012-05-29'),
    uniqueLink: 'https://uniquelink18392848',
    homeTeam: new mongoose.Types.ObjectId(),
    awayTeam: new mongoose.Types.ObjectId(),
    homeTeamScore: 0,
    awayTeamScore: 0,
    pendingMatch: true,
  }

  it('Should save fixture data', async () => {
    const fixture = new Fixture(fixtureData)
    expect(() => fixture.save()).not.toThrow()
  })

  it('Should throw an error on invalid date', async () => {
    const {matchDate, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        matchDate: 'invaliddate',
        ...otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should ensure date is required', async () => {
    const {matchDate, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture(otherValues)
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test that homeTeam field is a valid objectId', async () => {
    const {homeTeam, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        homeTeam: 'invalid892ObjddffId',
        otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test that homeTeam is required', async () => {
    const {homeTeam, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture(otherValues)
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test that awayTeam field is a valid objectId', async () => {
    const {homeTeam, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        homeTeam: 'invalid892ObjddffId',
        otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test that awayTeam is required', async () => {
    const {homeTeam, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture(otherValues)
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test homeTeamScore is a valid number', async () => {
    const {homeTeamScore, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        homeTeamScore: '5',
        otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test awayTeamScore is a valid number', async () => {
    const {awayTeamScore, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        awayTeamScore: '5',
        otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })

  it('Should test that pendingMatch field is a boolean', async () => {
    const {awayTeamScore, ...otherValues} = fixtureData
    try {
      const fixture = new Fixture({
        awayTeamScore: 'true',
        otherValues,
      })
      await fixture.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Fixture validation failed')
    }
  })
})
