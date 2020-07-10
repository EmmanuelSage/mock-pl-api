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
        throw new Error('record already exists')
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
        ...fixtureSlug,
        ...fixtureData,
      }
      await this.updateFixture(slugedFixture)

      return slugedFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  // This fixture can both be seen by the user and the admin
  async getSpecificFixture(fixtureId) {
    try {
      const fixtureIdObj = generateObjectId(fixtureId)

      const gottenFixture = await this.Fixture.findOne(
        {_id: fixtureIdObj},
        {admin: 0}
      )
        .select('-__v')
        .populate('home', '_id name')
        .populate('away', '_id name')
        .exec()
      if (!gottenFixture) {
        throw new Error('no record found')
      }
      return gottenFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateFixture(fixture) {
    try {
      const record = await this.Fixture.findOne({
        $and: [
          {homeTeam: generateObjectId(fixture.homeTeam)},
          {awayTeam: generateObjectId(fixture.awayTeam)},
        ],
      })

      if (!record) {
        throw new Error('Fixture not Found')
      }

      const updatedFixture = await this.Fixture.findOneAndUpdate(
        {_id: record._id},
        {$set: fixture},
        {new: true}
      )

      return updatedFixture
    } catch (error) {
      throw new Error(error)
    }
  }

  async getFixtures() {
    try {
      const gottenFixtures = await this.Fixture.find()
        .select('-admin')
        .select('-__v')
        .populate('home', '_id name')
        .populate('away', '_id name')
        .sort('matchday')
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
        throw new Error('something went wrong')
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
      }).exec()
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
