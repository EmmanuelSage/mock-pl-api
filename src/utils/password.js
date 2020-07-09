import bcrypt from 'bcrypt'

const hashPassword = (userPassword) => {
  const passwordToHash = userPassword
  const salt = bcrypt.genSaltSync(15)
  const hashedPassword = bcrypt.hashSync(passwordToHash, salt)
  return hashedPassword
}

const checkValidPassword = (hashedPassword, userPassword) => {
  const isValid = bcrypt.compareSync(hashedPassword, userPassword)
  return isValid
}

export default {hashPassword, checkValidPassword}
