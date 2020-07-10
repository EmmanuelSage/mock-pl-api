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
      const newUser = await this.userService.createUser(user)
      return res.status(201).json({
        status: 201,
        data: newUser,
        message: 'Sign up was successfull',
      })
    } catch (error) {
      if (error.message.includes('409')) {
        return res
          .status(409)
          .json({status: 409, error: 'Email has already been registered'})
      }
      return res.status(500).json({
        status: 500,
        error: error.message,
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

      return res.status(200).json({
        status: 200,
        message: 'Login was successfull',
        token,
      })
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: error.message,
      })
    }
  }
}

export default UserController
