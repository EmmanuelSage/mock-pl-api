import {isValidEmail, isValidName} from './helper'

const validate = {
  validateUser(req) {
    const {email, fullName, password} = req.body
    const errors = []

    if (!isValidEmail(email) || !email) {
      errors.push({emailError: 'Please enter a valid email address'})
    }
    if (!isValidName(fullName) || !fullName) {
      errors.push({
        fullNameError: 'Please enter a valid fullName i.e Emmy Sage',
      })
    }
    if (!password) {
      errors.push({passwordError: 'Please enter a valid password'})
    }
    if (password && password.length < 6) {
      errors.push({
        passwordError: 'Please enter a password of at least six characters',
      })
    }

    return errors
  },

  verifyLogin(req) {
    const {email, password} = req.body

    const errors = []

    if (!email || !isValidEmail(email)) {
      errors.push({email: 'Email or password is incorrect'})
    }
    if (!password || password.length < 6) {
      errors.push({
        password: 'Email or password is incorrect',
      })
    }
    return errors
  },
}

export default validate
