import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const {ObjectId} = mongoose.Types

export const isValidEmail = (email) => {
  return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/.test(
    email
  )
}

export const isValidName = (name) => {
  return /[a-zA-Z]+\s+[a-zA-Z]+/.test(name)
}

export const generateToken = (id) => {
  const token = jwt.sign({_id: id.toString()}, process.env.JWT_SECRET, {
    expiresIn: '2d',
  })
  return token
}

// prefer this to native implementation because id's like "timtomtamted" returns true
export const isValidObjectId = (id) => {
  const isValidId = ObjectId.isValid(id)
  if (isValidId) {
    return String(new ObjectId(id)) === id
  }
  return false
}

export const generateObjectId = () => {
  const newId = new ObjectId()
  return newId
}

export default {isValidEmail, isValidObjectId, generateObjectId, isValidName}
