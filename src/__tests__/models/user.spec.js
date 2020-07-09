import User from '../../models/user'
import {connect} from '../../setupTest/config'

describe('User model tests', () => {
  beforeAll(async () => {
    await connect()
  })

  const userData = {
    fullName: 'EmmanuelSage',
    email: 'xyemmanuel@gmail.com',
    password: 'djkf839rn3rn437nfnfn244287',
    isAdmin: false,
  }

  it('Should save user data', async () => {
    const user = new User(userData)
    expect(() => user.save()).not.toThrow()
  })

  it('Should test that fullName field is required', async () => {
    const {fullName, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that email field is required', async () => {
    const {email, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that password field is required', async () => {
    const {password, ...otherValues} = userData
    try {
      const user = new User({
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that password field has a minimum length of 7', async () => {
    const {password, ...otherValues} = userData
    try {
      const user = new User({
        password: '123456',
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should test that email field is validated', async () => {
    const {email, ...otherValues} = userData
    try {
      const user = new User({
        email: 'iowed.kds',
        ...otherValues,
      })
      await user.save()
    } catch (error) {
      expect(error).toBeTruthy()
      expect(error._message).toMatch('User validation failed')
    }
  })

  it('Should trim extra spaces on fullName', async () => {
    const {fullName, ...otherValues} = userData
    const user = new User({
      fullName: ' Emmanuel Sage    ',
      ...otherValues,
    })
    expect(user.fullName).toBe('Emmanuel Sage')
  })

  it('Should trim extra spaces on email', async () => {
    const {email, ...otherValues} = userData
    const user = new User({
      email: ' bankwithus@gmail.com    ',
      ...otherValues,
    })
    expect(user.email).toBe('bankwithus@gmail.com')
  })

  it('Should trim extra spaces on password', async () => {
    const {password, ...otherValues} = userData
    const user = new User({
      password: ' dscsdasdcdcd    ',
      ...otherValues,
    })
    expect(user.password).toBe('dscsdasdcdcd')
  })

  it('Should test that email field is lowercased', async () => {
    const {email, ...otherValues} = userData
    const user = new User({
      email: 'BAKwithUs@gmail.com',
      ...otherValues,
    })
    expect(user.email).toBe('bakwithus@gmail.com')
  })
})
