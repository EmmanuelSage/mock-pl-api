import FixtureController from '../../controllers/fixture.controller'
import FixtureService from '../../services/fixture.service'
import validate from '../../utils/validate'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('FixtureController', () => {
  let res
  let fixtureController
  let fixtureService

  beforeEach(() => {
    res = mockResponse()
    fixtureService = new FixtureService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createFixture', () => {
    it('should return error(s) when validation fails', async () => {
      const req = {
        body: {
          home: 'Ttrecceex392sdsc34dsds15b5cf92',
          away: 'Ttrecceex392sdsc34dsds15b5cf92',
          matchday: '1987-12-03',
        },
      }

      const errors = [
        {home: 'a valid home team is required'},
        {matchday: "can't create a fixture in the past"},
      ]

      const stub = jest
        .spyOn(validate, 'fixtureValidate')
        .mockReturnValue(errors)

      fixtureController = new FixtureController(fixtureService)

      await fixtureController.createFixture(req, res)

      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({status: 400, errors})
    })
  })
})
