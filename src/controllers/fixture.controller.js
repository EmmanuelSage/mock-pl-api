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
      await this.teamService.checkTeams(homeTeam, awayTeam)

      const fixture = {
        homeTeam,
        awayTeam,
        matchDate,
        homeTeamScore,
        awayTeamScore,
        pendingMatch,
      }

      const createFixture = await this.fixtureService.createFixture(fixture)

      return res.status(201).json({
        status: 201,
        data: createFixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      })
    }
  }

  async updateFixture(req, res) {
    const errors = validate.fixtureValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    try {
      const updateFixture = await this.fixtureService.updateFixture(req.body)

      return res.status(200).json({
        status: 200,
        data: updateFixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
      await this.fixtureService.deleteFixture(id)

      return res.status(200).json({
        status: 200,
        data: 'fixture deleted',
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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

      return res.status(200).json({
        status: 200,
        data: fixture,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
        error: error.message,
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
        error: error.message,
      })
    }
  }
}

export default FixtureController
