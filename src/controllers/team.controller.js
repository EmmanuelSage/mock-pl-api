import {isValidObjectId} from '../utils/helper'
import Team from '../models/team'
import validate from '../utils/validate'

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
      return res.status(201).json({
        status: 201,
        data: createTeam,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
    console.log(name, id)

    try {
      const updateTeam = await this.teamService.updateTeam(id, name)
      return res.status(200).json({
        status: 200,
        data: updateTeam,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
      await this.teamService.deleteTeam(id)
      return res.status(200).json({
        status: 200,
        data: 'team deleted',
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
        error: error.message,
      })
    }
  }

  async getTeams(req, res) {
    try {
      const teams = await this.teamService.getTeams()

      return res.status(200).json({
        status: 200,
        data: teams,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      })
    }
  }
}

export default TeamController
