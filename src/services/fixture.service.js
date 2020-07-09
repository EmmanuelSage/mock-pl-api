import {generateObjectId} from '../utils/helper'
import Fixture from '../models/fixture'

class FixtureService {
  constructor() {
    this.Fixture = Fixture
  }

  async createFixture(fixture) {
    try {
      const record = await this.Fixture.findOne({
        $and: [{homeTeam: fixture.homeTeam}, {awayTeam: fixture.awayTeam}],
      })

      if (record) {
        throw new Error('record already exists')
      }

      const currentDate = Date.now().toString()

      const createdFixture = await Fixture.create({
        uniqueLink: `${fixture.homeTeam}-${fixture.awayTeam}-${currentDate}`,
        ...fixture,
      })

      return createdFixture
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
        throw new Error('Fixture no Found')
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
}

export default FixtureService
