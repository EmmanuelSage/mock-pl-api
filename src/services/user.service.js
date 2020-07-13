import {generateObjectId, generateToken} from '../utils/helper'
import User from '../models/user'
import password from '../utils/password'

class UserService {
  constructor() {
    this.User = User
  }

  async createUser(user) {
    try {
      const existingUser = await this.User.findOne({email: user.email})

      if (existingUser) {
        return null
      }

      const newUser = {email: user.email, fullName: user.fullName}
      newUser.password = password.hashPassword(user.password)

      const createdUser = new User(newUser)
      await createdUser.save()

      const {_id, fullName, email} = createdUser

      const userToken = generateToken(_id)

      const createdUserData = {
        _id,
        fullName,
        email,
      }
      return {createdUserData, userToken}
    } catch (error) {
      throw new Error(error)
    }
  }

  async loginUser(email, pass) {
    try {
      const user = await this.User.findOne({email})
      if (!user) {
        return null
      }
      const validPassword = password.checkValidPassword(pass, user.password)

      if (validPassword) {
        const token = generateToken(user._id)
        return token
      }
      return null
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(userId) {
    const userObjID = generateObjectId(userId)

    try {
      const gottenUser = await this.User.findOne({_id: userObjID})
      if (!gottenUser) {
        return null
      }

      const {fullName, email, role} = gottenUser

      const publicUser = {
        _id: gottenUser._id,
        fullName,
        email,
        role,
      }

      return publicUser
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default UserService
