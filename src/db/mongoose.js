import mongoose from 'mongoose'
import dotenv from 'dotenv'
import getDbConnURI from './envConfig'

dotenv.config()

const mongoURI = process.env.MONGODB_URI || getDbConnURI()

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

const connectDb = () => mongoose.connect(mongoURI, connectionOptions)

export default connectDb
