import validate from '../../utils/validate'
import UserController from '../../controllers/user.controller'
import UserService from '../../services/user.service'

describe('UserController', () => {
  const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  let res
  let userController
  let userService

  beforeEach(() => {
    res = mockResponse()
    userService = new UserService()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const req = {
        body: {
          fullName: 'Jerry Springer',
          email: 'jerryspring@hotmail.com',
          password: 'myseCrure56pass',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockReturnValue(req.body)

      userController = new UserController(userService)

      await userController.createUser(req, res)

      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(201)
    })

    it('Should catch error from try catch', async () => {
      const req = {
        body: {
          fullName: 'Noah Banker',
          email: 'NoahIsAlive@gmail.com',
          password: 'YoucantGuessMyPass',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          throw new Error('Error')
        })

      userController = new UserController(userService)

      await userController.createUser(req, res)

      expect(errorStub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({
        status: 500,
        error: 'Something went wrong',
      })
    })

    it('Should not register if Email has already been registered', async () => {
      const req = {
        body: {
          fullName: 'Noah Banker',
          email: 'NoahIsAlive@gmail.com',
          password: 'YoucantGuessMyPass',
        },
      }

      const errorStub = jest.spyOn(validate, 'validateUser').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          return null
        })

      userController = new UserController(userService)

      await userController.createUser(req, res)

      expect(errorStub).toHaveBeenCalled()
      expect(stub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(409)
      expect(res.json).toHaveBeenCalledWith({
        status: 409,
        error: 'Email has already been registered',
      })
    })
  })

  describe('loginUser', () => {
    it('should return errors array when validation fails', async () => {
      const req = {
        body: {email: 'badelogeer.com', password: 'secretpass4632'},
      }

      const errors = [{email: 'a valid email is required'}]

      const errorStub = jest
        .spyOn(validate, 'verifyLogin')
        .mockReturnValue(errors)

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({status: 400, errors})
    })

    it('should not login a user due to error', async () => {
      const req = {
        body: {email: 'xjemmanfri@gmail.com', password: 'jackxjemman123'},
      }

      const errorStub = jest.spyOn(validate, 'verifyLogin').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'loginUser')
        .mockImplementation(() => {
          return null
        })

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(stub).toHaveBeenCalledTimes(1)
      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(401)
      expect(res.json).toHaveBeenCalledWith({
        status: 401,
        error: 'Email or password is incorrect',
      })
    })

    it('should login a user successfully', async () => {
      const req = {
        body: {email: 'xforteila@gmail.com', password: 'sefth1234grind'},
      }

      const stubValue = {
        token: 'faketokenvalue',
      }

      const errorStub = jest.spyOn(validate, 'verifyLogin').mockReturnValue([])

      const stub = jest
        .spyOn(userService, 'loginUser')
        .mockReturnValue(stubValue)

      userController = new UserController(userService)

      await userController.loginUser(req, res)

      expect(stub).toHaveBeenCalledTimes(1)
      expect(errorStub).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledTimes(1)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        status: 200,
        token: stubValue,
        message: 'Login was successfull',
      })
    })
  })
})
