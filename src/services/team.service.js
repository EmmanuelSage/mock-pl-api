import {generateObjectId} from '../utils/helper'
import Team from '../models/team'

class TeamService {
  constructor() {
    this.team = Team
  }

  async createTeam(team) {
    try {
      const record = await this.team.findOne({name: team.name})
      if (record) {
        return null
      }

      const createdTeam = await this.team.create(team)

      return createdTeam
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTeam(teamId) {
    try {
      const teamIdObject = generateObjectId(teamId)

      const gottenTeam = await this.team
        .findOne({_id: teamIdObject})
        .select('-__v')
        .exec()

      if (!gottenTeam) {
        return null
      }
      return gottenTeam
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTeams() {
    try {
      return await this.team.find().select('-__v').sort('name').exec()
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateTeam(teamId, teamName) {
    try {
      const team = await this.team.findOne({_id: generateObjectId(teamId)})

      if (!team) {
        return null
      }
      team.name = teamName

      await team.save()

      return team
    } catch (error) {
      if (error.message.includes('duplicate')) {
        return '409'
      }
      throw error
    }
  }

  async deleteTeam(teamId) {
    try {
      const teamIdObj = generateObjectId(teamId)

      const deleted = await this.team.deleteOne({_id: teamIdObj})
      if (deleted.deletedCount === 0) {
        return null
      }
      return deleted
    } catch (error) {
      throw new Error(error)
    }
  }

  async checkTeams(homeId, awayId) {
    try {
      const ids = [generateObjectId(homeId), generateObjectId(awayId)]

      const records = await this.team.find().where('_id').in(ids).exec()

      if (records.length !== 2) {
        return null
      }
      return records
    } catch (error) {
      throw new Error(error)
    }
  }

  async searchTeam(name) {
    try {
      const teams = await this.team
        .find({
          name: {$regex: new RegExp(name, 'i')},
        })
        .select('-__v')
        .exec()
      return teams
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default TeamService
