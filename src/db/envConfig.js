import dotenv from 'dotenv'

dotenv.config()

const getDbConnURI = (isTest, testEnv) => {
  let mongoConnectionString
  let nodeEnv

  if (isTest) {
    nodeEnv = testEnv
  } else {
    nodeEnv = process.env.NODE_ENV || 'development'
  }

  if (nodeEnv === 'development') {
    mongoConnectionString = process.env.DEV_MONGODB_URI
  }
  if (nodeEnv === 'test') {
    mongoConnectionString = process.env.TEST_MONGODB_URI
  }
  return mongoConnectionString
}

export default getDbConnURI
