import request from 'supertest'
import app from '../app'

test('Should return welcome', async () => {
  const response = await request(app).get('/').send().expect(200)
  expect(response.body.data.message).toEqual('Welcome to Mock Pl api')
})
