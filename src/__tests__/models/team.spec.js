import Team from '../../models/team'
import {connect} from '../../setupTest/config'

describe('Team model tests', () => {
  beforeAll(async () => {
    await connect()
  })

  const teamData = {
    name: 'Manchester United FC',
    key: 'manutd',
    code: 'MUN',
  }

  it('Should save team data', async () => {
    const team = new Team(teamData)
    expect(() => team.save()).not.toThrow()
  })

  it('Should test that name is required', async () => {
    const {name, ...otherValues} = teamData
    try {
      const team = new Team({
        ...otherValues,
      })
      await team.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Team validation failed')
    }
  })

  it('Should trim extra spaces on name', async () => {
    const {name, ...otherValues} = teamData
    const team = new Team({
      name: '   Mnuas      ',
      ...otherValues,
    })
    await team.save()
    expect(team.name).toBe('Mnuas')
  })

  it('Should test that key is required', async () => {
    const {key, ...otherValues} = teamData
    try {
      const team = new Team({
        ...otherValues,
      })
      await team.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Team validation failed')
    }
  })

  it('Should trim extra spaces on key', async () => {
    const {key, ...otherValues} = teamData
    const team = new Team({
      key: '   Mnuas      ',
      ...otherValues,
    })
    expect(team.key).toBe('Mnuas')
  })

  it('Should test that code is required', async () => {
    const {code, ...otherValues} = teamData
    try {
      const team = new Team({
        ...otherValues,
      })
      await team.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('Team validation failed')
    }
  })

  it('Should trim extra spaces on code', async () => {
    const {code, ...otherValues} = teamData
    const team = new Team({
      code: '   Mnuas      ',
      ...otherValues,
    })
    expect(team.code).toBe('Mnuas')
  })
})
