import mongoose from 'mongoose'
import dotenv from 'dotenv'
import getDbConnURI from './envConfig'

dotenv.config()

const mongoURI = getDbConnURI()

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
