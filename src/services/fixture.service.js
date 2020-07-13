import {generateObjectId} from '../utils/helper'
import Fixture from '../models/fixture'

class FixtureService {
  constructor() {
    this.Fixture = Fixture
  }

  async createFixture(fixture) {
    try {
      const existingFixture = await this.Fixture.findOne({
        $and: [{homeTeam: fixture.homeTeam}, {awayTeam: fixture.awayTeam}],
      })

      if (existingFixture) {
        return null
      }

      const createdFixture = await Fixture.create(fixture)
      const populatedFixture = await this.populateFixture(createdFixture._id)

      const {homeTeam, awayTeam} = populatedFixture
      const rawSlug = `${homeTeam.name}_${awayTeam.name}_${Date.now()}`
      const cleanSlug = rawSlug.split(' ').join('_')
      const fixtureSlug = {
        slug: cleanSlug,
      }
      const {slug, ...fixtureData} = createdFixture._doc
      const slugedFixture = {
        ...fixtureData,
        ...fixtureSlug,
      }

      await this.updateFixture(slugedFixture._id)

      return slugedFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  async getSpecificFixture(fixtureId) {
    try {
      const fixtureIdObj = generateObjectId(fixtureId)

      const gottenFixture = await this.Fixture.findOne(
        {_id: fixtureIdObj},
        {admin: 0}
      )
        .select('-__v')
        .populate('homeTeam', '_id name')
        .populate('awayTeam', '_id name')
        .exec()

      if (!gottenFixture) {
        return null
      }
      return gottenFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateFixture(fixtureId) {
    try {
      const record = await this.Fixture.findOne(generateObjectId(fixtureId))

      if (!record) {
        return null
      }

      const updatedFixture = await this.Fixture.findOneAndUpdate(
        {_id: record._id},
        {$set: fixtureId},
        {new: true}
      )

      return updatedFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  async getFixtures(pending) {
    const sortBy = {}
    if (pending) {
      sortBy.pendingMatch = pending === 'true'
    }
    try {
      const gottenFixtures = await this.Fixture.find(sortBy)
        .select('-__v')
        .populate('homeTeam', '_id name')
        .populate('awayTeam', '_id name')
        .sort('matchDate')
        .exec()

      return gottenFixtures
    } catch (error) {
      throw new Error(error)
    }
  }

  async deleteFixture(fixtureId) {
    try {
      const deleted = await this.Fixture.deleteOne({_id: fixtureId})
      if (deleted.deletedCount === 0) {
        return null
      }

      return deleted
    } catch (error) {
      throw new Error(error)
    }
  }

  async searchFixture(query) {
    try {
      const fixtures = await this.Fixture.find({
        slug: {$regex: new RegExp(query, 'i')},
      })
        .select('-__v')
        .populate('homeTeam', '_id name')
        .populate('awayTeam', '_id name')
        .exec()
      return fixtures
    } catch (error) {
      throw new Error(error)
    }
  }

  async populateFixture(fixtureId) {
    const populatedFixture = await this.Fixture.findById(fixtureId)
    await populatedFixture.populate('homeTeam').execPopulate()
    await populatedFixture.populate('awayTeam').execPopulate()
    return populatedFixture
  }
}

export default FixtureService
