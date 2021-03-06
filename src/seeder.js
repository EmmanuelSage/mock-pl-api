import User from './models/user'
import Fixture from './models/fixture'
import Team from './models/team'
import {generateObjectId} from './utils/helper'
import password from './utils/password'

const seededTeamsCollection = {}

const createSeededUsers = async () => {
  await User.deleteMany({})
  const users = [
    {
      _id: generateObjectId(),
      fullName: 'Emmanuel Sage',
      email: 'emmysageRocks@example.com',
      password: password.hashPassword('crazyPass'),
      role: 'admin',
    },
    {
      _id: generateObjectId(),
      fullName: 'Kyle Reeves',
      email: 'kylereeves@example.com',
      password: password.hashPassword('crazyPass'),
      role: 'user',
    },
    {
      _id: generateObjectId(),
      fullName: 'Kendra Martins',
      email: 'kendragirl@example.com',
      password: password.hashPassword('crazyPass'),
      role: 'admin',
    },
    {
      _id: generateObjectId(),
      fullName: 'Rita Steves',
      email: 'ritaisawe@example.com',
      password: password.hashPassword('crazyPass'),
      role: 'user',
    },
  ]

  await User.insertMany(users)
}

const createSeededTeams = async () => {
  await Team.deleteMany({})

  seededTeamsCollection.team1 = Team({
    name: 'Fulham FC',
  })
  seededTeamsCollection.team2 = Team({
    name: 'Crystal Palace FC',
  })
  seededTeamsCollection.team3 = Team({
    name: 'Huddersfield Town AFC',
  })
  seededTeamsCollection.team4 = Team({
    name: 'Chelsea FC',
  })
  seededTeamsCollection.team5 = Team({
    name: 'Watford FC',
  })
  seededTeamsCollection.team6 = Team({
    name: 'Everton FC',
  })
  seededTeamsCollection.team7 = Team({
    name: 'Liverpool FC',
  })
  seededTeamsCollection.team8 = Team({
    name: 'Arsenal FC',
  })

  await seededTeamsCollection.team1.save()
  await seededTeamsCollection.team2.save()
  await seededTeamsCollection.team3.save()
  await seededTeamsCollection.team4.save()
  await seededTeamsCollection.team5.save()
  await seededTeamsCollection.team6.save()
  await seededTeamsCollection.team7.save()
  await seededTeamsCollection.team8.save()
}

const createSeededFixtures = async () => {
  await Fixture.deleteMany({})
  const fixtures = [
    {
      matchDate: '2021-05-29',
      homeTeam: seededTeamsCollection.team1._id,
      awayTeam: seededTeamsCollection.team2._id,
      homeTeamScore: 2,
      awayTeamScore: 0,
      pendingMatch: true,
      slug: 'Fulham_FC_Crystal_Palace_FC_1594457254584',
    },
    {
      matchDate: '2019-05-29',
      homeTeam: seededTeamsCollection.team3._id,
      awayTeam: seededTeamsCollection.team4._id,
      homeTeamScore: 0,
      awayTeamScore: 1,
      pendingMatch: false,
      slug: 'Huddersfield_Town_AFC_Chelsea_FC_1594457328761',
    },
    {
      matchDate: '2021-05-29',
      homeTeam: seededTeamsCollection.team5._id,
      awayTeam: seededTeamsCollection.team6._id,
      homeTeamScore: 3,
      awayTeamScore: 2,
      pendingMatch: true,
      slug: 'Watford_FC_Everton_FC_1594457362400',
    },
    {
      matchDate: '2019-05-29',
      homeTeam: seededTeamsCollection.team7._id,
      awayTeam: seededTeamsCollection.team8._id,
      homeTeamScore: 1,
      awayTeamScore: 2,
      pendingMatch: false,
      slug: 'Liverpool_FC_Arsenal_FC_1594457393758',
    },
    {
      matchDate: '2021-05-29',
      homeTeam: seededTeamsCollection.team1._id,
      awayTeam: seededTeamsCollection.team4._id,
      homeTeamScore: 0,
      awayTeamScore: 0,
      pendingMatch: true,
      slug: 'Fulham_FC_Chelsea_FC_1594457425627',
    },
    {
      matchDate: '2019-05-29',
      homeTeam: seededTeamsCollection.team2._id,
      awayTeam: seededTeamsCollection.team5._id,
      homeTeamScore: 1,
      awayTeamScore: 1,
      pendingMatch: false,
      slug: 'Crystal_Palace_FC_Watford_FC_1594457453368',
    },
    {
      matchDate: '2021-05-29',
      homeTeam: seededTeamsCollection.team3._id,
      awayTeam: seededTeamsCollection.team6._id,
      homeTeamScore: 4,
      awayTeamScore: 2,
      pendingMatch: true,
      slug: 'Huddersfield_Town AFC_Everton_FC_1594457483249',
    },
    {
      matchDate: '2019-05-29',
      homeTeam: seededTeamsCollection.team4._id,
      awayTeam: seededTeamsCollection.team7._id,
      homeTeamScore: 2,
      awayTeamScore: 1,
      pendingMatch: true,
      slug: 'Chelsea_FC_Liverpool_FC_1594457533087',
    },
    {
      matchDate: '2021-05-29',
      homeTeam: seededTeamsCollection.team5._id,
      awayTeam: seededTeamsCollection.team8._id,
      homeTeamScore: 4,
      awayTeamScore: 2,
      pendingMatch: false,
      slug: 'Watford_FC_Arsenal FC_1594457562168',
    },
  ]
  await Fixture.insertMany(fixtures)
}

const seedAllModels = async () => {
  await createSeededUsers()
  await createSeededTeams()
  await createSeededFixtures()
}

export {createSeededUsers, createSeededTeams, createSeededFixtures}

export default seedAllModels
