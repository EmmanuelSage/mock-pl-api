import User from '../../src/models/user'
import Team from '../../src/models/team'
import password from '../../src/utils/password'
import {generateObjectId, generateToken} from '../../src/utils/helper'

export async function seedFixtureAdmin() {
  const admin = {
    _id: generateObjectId(),
    fullName: 'Seger Admin',
    email: 'segraterue@example.com',
    password: password.hashPassword('password'),
    role: 'admin',
  }
  const seededAdmin = await User.create(admin)

  const token = generateToken(seededAdmin._id)

  return {seededAdmin, token}
}

export async function seedFixtureUser() {
  const user = {
    _id: generateObjectId(),
    fullName: 'Emmanuel Sage',
    email: 'emmysage@example.com',
    password: password.hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  const token = generateToken(seededUser._id)

  return {seededUser, token}
}

export async function seedTeamAdmin() {
  const admin = {
    _id: generateObjectId(),
    fullName: 'Abrahm Admin',
    email: 'arahnfisger@example.com',
    password: password.hashPassword('password'),
    role: 'admin',
  }
  const seededAdmin = await User.create(admin)

  const token = generateToken(seededAdmin._id)

  return {seededAdmin, token}
}

export async function seedTeamUser() {
  const user = {
    _id: generateObjectId(),
    fullName: 'Teamer User',
    email: 'teameruser@example.com',
    password: password.hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  const token = generateToken(seededUser._id)

  return {seededUser, token}
}

export async function seedTeams() {
  const teams = [
    {
      name: 'AFC Bournemouth',
    },
    {
      name: 'Cardiff City FC',
    },
  ]
  const seededTeams = await Team.insertMany(teams)
  return seededTeams
}
