import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'

beforeAll((done) => {
  done()
})

afterAll((done) => {
  // Close the DB connection.
  mongoose.connection.close()
  done()
})

it('Should return welcome', async () => {
  const response = await request(app).get('/').send().expect(200)
  expect(response.body.data.message).toEqual('Welcome to Mock Pl api')
})
