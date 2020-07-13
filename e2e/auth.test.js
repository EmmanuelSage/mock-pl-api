import request from 'supertest'
import app from '../src/app'
import mock from './fixtures/mock'

describe('User Sign Up', () => {
  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        ...mock.signup1,
      })
    expect(res.body.status).toEqual(201)
    expect(res.body.message).toEqual('Sign up was successfull')
    expect(res.body.data.email).toEqual(mock.signup1.email)
  })

  it('should not signup a user with the same email', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        ...mock.signup1,
        password: 'passwordisdiff',
      })
    expect(res.body.status).toEqual(409)
    expect(res.body.error).toEqual('Email has already been registered')
  })
})

describe('User Sign In', () => {
  it('should successfully sign in a user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: mock.signup1.email,
      password: mock.signup1.password,
    })
    expect(res.body.status).toEqual(200)
    expect(res.body.message).toEqual('Login was successfull')
    expect(res.body.token).toBeTruthy()
  })

  it('should not sign in a non-existing user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'idontexist@gmail.com',
      password: 'fakepassword',
    })
    expect(res.body.status).toEqual(401)
    expect(res.body.error).toEqual('Email or password is incorrect')
  })
})
