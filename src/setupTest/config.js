import mongoose from 'mongoose'

// setup to connect to in memory db
export const connect = async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    reconnectInterval: 1000,
  })
}

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
}

export const clearDatabase = async () => {
  const {collections} = mongoose.connection
  const collectionsKeys = Object.keys(collections)
  for (let i = 0; i < collectionsKeys.length; i += 1) {
    const collection = collections[collectionsKeys[i]]
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany()
  }
}
