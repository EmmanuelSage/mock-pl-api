import getDbConnURI from '../../db/envConfig'

describe('Environmental Variables', () => {
  const previousEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {...previousEnv}
  })

  afterAll(() => {
    process.env = previousEnv
  })

  it('Should set DEV_MONGODB_URI in development environment', () => {
    process.env.DEV_MONGODB_URI = 'devConnString'
    process.env.TEST_MONGODB_URI = 'testConnString'

    const connString = getDbConnURI(true, 'development')
    expect(connString).toBe('devConnString')
  })

  it('Should set TEST_MONGODB_URI in test environment', () => {
    process.env.DEV_MONGODB_URI = 'devConnString'
    process.env.TEST_MONGODB_URI = 'testConnString'

    const connString = getDbConnURI(true, 'test')
    expect(connString).toBe('testConnString')
  })

  it('Should set develop environment when NODE_ENV is null', () => {
    process.env.NODE_ENV = null
    process.env.DEV_MONGODB_URI = 'devConnString'
    process.env.TEST_MONGODB_URI = 'testConnString'

    const connString = getDbConnURI()
    expect(connString).toBe('devConnString')
  })
})
