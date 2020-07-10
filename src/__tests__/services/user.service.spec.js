import {generateObjectId} from '../../utils/helper'
import UserService from '../../services/user.service'
import password from '../../utils/password'
import {seedUser} from '../../setupTest/seeder'
import {connect, clearDatabase, closeDatabase} from '../../setupTest/config'

let seededUser

beforeAll(async () => {
  await connect()
})
beforeEach(async () => {
  seededUser = await seedUser()
})

afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await closeDatabase()
})

describe('UserService', () => {
  describe('createUser', () => {
    it('should not create a new user if record already exists', async () => {
      const user = {
        fullName: 'John Graham',
        email: seededUser.email,
        password: 'notTheSamePass',
      }
      const userService = new UserService()

      await expect(userService.createUser(user)).rejects.toThrow(
        'record exists : 409'
      )
    })

    it('should create a new user', async () => {
      const userNew = {
        fullName: 'Jack Ryan',
        email: 'jackiery@example.com',
        password: 'yupMyPassword',
      }

      const hashPass = jest
        .spyOn(password, 'hashPassword')
        .mockReturnValue('ksjndfklsndflksdmlfksdf')

      const userService = new UserService()
      const user = await userService.createUser(userNew)

      expect(hashPass).toHaveBeenCalled()
      expect(user._id).toBeDefined()
      expect(user.fullName).toBe(userNew.fullName)
      expect(user.role).toBe(userNew.role)
    })
  })

  describe('getUser', () => {
    it('should not get an user if record does not exists', async () => {
      try {
        const userObjID = generateObjectId('5e682d0d580b5a6fb795b842')

        const userService = new UserService()

        await userService.getUser(userObjID)
      } catch (e) {
        expect(e.message).toMatch('no record found')
      }
    })
  })
})
