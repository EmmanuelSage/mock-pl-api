import {isValidObjectId} from '../utils/helper'
import validate from '../utils/validate'

class FixtureController {
  constructor(fixtureService, teamService) {
    this.fixtureService = fixtureService
    this.teamService = teamService
  }

  async createFixture(req, res) {
    const errors = validate.fixtureValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }
    const {
      homeTeam,
      awayTeam,
      matchDate,
      homeTeamScore,
      awayTeamScore,
      pendingMatch,
    } = req.body

    try {
      const foundTeams = await this.teamService.checkTeams(homeTeam, awayTeam)

      if (!foundTeams) {
        return res.status(400).json({
          status: 400,
          error: 'Teams do not exist',
        })
      }

      const fixture = {
        homeTeam,
        awayTeam,
        matchDate,
        homeTeamScore,
        awayTeamScore,
        pendingMatch,
      }

      const createFixture = await this.fixtureService.createFixture(fixture)

      if (!createFixture) {
        return res.status(400).json({
          status: 400,
          error: 'Record already exists',
        })
      }

      return res.status(201).json({
        status: 201,
        message: 'Fixture was successfully created',
        data: createFixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async updateFixture(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'fixture id is not valid',
      })
    }

    const errors = validate.fixtureValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    try {
      const updateFixture = await this.fixtureService.updateFixture(id)

      if (!updateFixture) {
        return res.status(400).json({
          status: 400,
          error: 'Fixture not Found',
        })
      }

      return res.status(200).json({
        message: 'Fixture was successfully updated',
        status: 200,
        data: updateFixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async deleteFixture(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'fixture id is not valid',
      })
    }

    try {
      const deletedFixture = await this.fixtureService.deleteFixture(id)

      if (!deletedFixture) {
        return res.status(400).json({
          status: 400,
          error: 'Fixture was not Found',
        })
      }

      return res.status(200).json({
        status: 200,
        data: 'fixture deleted',
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async getSpecificFixture(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'fixture id is not valid',
      })
    }

    try {
      const fixture = await this.fixtureService.getSpecificFixture(id)

      if (!fixture) {
        return res.status(400).json({
          status: 400,
          error: 'No record with the Id was found',
        })
      }
      return res.status(200).json({
        status: 200,
        data: fixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async getFixtures(req, res) {
    try {
      const {pending} = req.query
      let fixtures
      if (pending && (pending === 'true' || pending === 'false')) {
        fixtures = await this.fixtureService.getFixtures(pending)
      } else {
        fixtures = await this.fixtureService.getFixtures()
      }

      return res.status(200).json({
        status: 200,
        data: fixtures,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async searchFixture(req, res) {
    const errors = validate.searchValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const query = req.query.query.trim()

    try {
      const searchResult = await this.fixtureService.searchFixture(query)
      return res.status(200).json({
        status: 200,
        data: searchResult,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }
}

export default FixtureController
