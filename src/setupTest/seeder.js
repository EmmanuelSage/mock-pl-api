import User from '../models/user'
import password from '../utils/password'
import {generateObjectId} from '../utils/helper'

export const seedUser = async () => {
  const user = {
    _id: generateObjectId(),
    fullName: 'Emmanuel Sage',
    email: 'emmysage@gmail.com',
    password: password.hashPassword('crazyPass'),
    role: 'user',
  }
  const seededUser = await User.create(user)

  return seededUser
}

export default {seedUser}
