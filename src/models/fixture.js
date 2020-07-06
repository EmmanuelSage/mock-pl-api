import mongoose from 'mongoose'

const fixtureSchema = new mongoose.Schema({
  matchDate: {
    type: Date,
    required: true,
  },
  uniqueLink: {
    type: String,
    unique: true,
  },
  homeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team',
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team',
  },
  homeTeamScore: {
    type: Number,
    default: 0,
  },
  awayTeamScore: {
    type: Number,
    default: 0,
  },
  pendingMatch: {
    type: Boolean,
    default: true,
  },
})

fixtureSchema.index({uniqueLink: 'text'})

const Fixture = mongoose.model('Fixture', fixtureSchema)

export default Fixture
