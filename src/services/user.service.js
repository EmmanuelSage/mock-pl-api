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
        throw new Error('record exists : 409')
      }

      const newUser = {email: user.email, fullName: user.fullName}
      newUser.password = password.hashPassword(user.password)

      const createdUser = new User(newUser)
      await createdUser.save()

      const {_id, fullName, email} = createdUser

      const createdUserData = {
        _id,
        fullName,
        email,
      }

      return createdUserData
    } catch (error) {
      throw new Error(error)
    }
  }

  async loginUser(email, pass) {
    try {
      const user = await this.User.findOne({email})
      if (!user) {
        throw new Error('Email or password is incorrect')
      }
      const validPassword = password.checkValidPassword(pass, user.password)

      if (validPassword) {
        const token = generateToken(user._id)
        return token
      }
      throw new Error('Email or password is incorrect')
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUser(userId) {
    const userObjID = generateObjectId(userId)

    try {
      const gottenUser = await this.User.findOne({_id: userObjID})
      if (!gottenUser) {
        throw new Error('no record found')
      }

      const {fullName, role} = gottenUser

      const publicUser = {
        _id: gottenUser._id,
        fullName,
        role,
      }

      return publicUser
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default UserService
