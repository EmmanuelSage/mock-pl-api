import validate from '../utils/validate'

class UserController {
  constructor(userService) {
    this.userService = userService
  }

  async createUser(req, res) {
    const errors = validate.validateUser(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const {fullName, email, password} = req.body

    const user = {
      fullName,
      email,
      password,
    }

    try {
      const userData = await this.userService.createUser(user)

      if (!userData) {
        return res
          .status(409)
          .json({status: 409, error: 'Email has already been registered'})
      }

      const {createdUserData, userToken} = userData

      return res.status(201).json({
        status: 201,
        data: createdUserData,
        message: 'Sign up was successfull',
        token: userToken,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }

  async loginUser(req, res) {
    const errors = validate.verifyLogin(req)
    if (errors.length > 0) {
      return res.status(400).json({
        status: 400,
        errors,
      })
    }

    const {email, password} = req.body

    try {
      const token = await this.userService.loginUser(email, password)

      if (!token) {
        return res.status(401).json({
          status: 401,
          error: 'Email or password is incorrect',
        })
      }

      return res.status(200).json({
        status: 200,
        message: 'Login was successfull',
        token,
      })
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      })
    }
  }
}

export default UserController
