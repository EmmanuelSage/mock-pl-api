import mongoose from 'mongoose'
import isValidEmail from '../utils/helper'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!isValidEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

const User = mongoose.model('User', userSchema)

export default User
