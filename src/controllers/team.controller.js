import client from '../redis'
import {isValidObjectId} from '../utils/helper'
import Team from '../models/team'
import validate from '../utils/validate'

const teamsKey = 'teams'

class TeamController {
  constructor(teamService) {
    this.teamService = teamService
  }

  async createTeam(req, res) {
    const errors = validate.teamValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const {name} = req.body

    try {
      const team = new Team({
        name,
      })

      const createTeam = await this.teamService.createTeam(team)

      if (!createTeam) {
        return res.status(400).json({
          status: 400,
          error: 'Team already exists',
        })
      }

      client.del(teamsKey)
      return res.status(201).json({
        status: 201,
        message: 'Team was created',
        data: createTeam,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async updateTeam(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'team id is not valid',
      })
    }

    const errors = validate.teamValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const {name} = req.body

    try {
      const updateTeam = await this.teamService.updateTeam(id, name)

      if (!updateTeam) {
        return res.status(400).json({
          status: 400,
          error: 'Team does not exist',
        })
      }

      if (updateTeam === '409') {
        return res.status(409).json({
          status: 409,
          error: 'Team already exists',
        })
      }

      client.del(teamsKey)
      return res.status(200).json({
        status: 200,
        message: 'Team was created',
        data: updateTeam,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async deleteTeam(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'team id is not valid',
      })
    }

    try {
      const deletedTeam = await this.teamService.deleteTeam(id)

      if (!deletedTeam) {
        return res.status(400).json({
          status: 400,
          error: 'Error deleting team',
        })
      }

      client.del(teamsKey)
      return res.status(200).json({
        status: 200,
        message: 'Team deleted',
        data: deletedTeam,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async getTeam(req, res) {
    const {id} = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        status: 400,
        error: 'invalid team id',
      })
    }

    try {
      try {
        const gottenTeam = await this.teamService.getTeam(id)

        if (!gottenTeam) {
          return res.status(400).json({
            status: 400,
            error: 'No team with the Id was found',
          })
        }
        return res.status(200).json({
          status: 200,
          data: gottenTeam,
        })
      } catch (error) {
        throw new Error(error)
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async getTeams(req, res) {
    client.get(teamsKey, async (_err, result) => {
      if (result) {
        return res.status(200).json({
          source: 'cache',
          status: 200,
          data: JSON.parse(result),
        })
      }
    })
    try {
      const teams = await this.teamService.getTeams()
      client.setex(teamsKey, 3600, JSON.stringify(teams))

      return res.status(200).json({
        source: 'server',
        status: 200,
        data: teams,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async searchTeam(req, res) {
    const errors = validate.searchValidate(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const query = req.query.query.trim()

    try {
      const searchResult = await this.teamService.searchTeam(query)
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

export default TeamController
