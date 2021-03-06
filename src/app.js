import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
import dotenv from 'dotenv'
import client, {rateLimiter} from './redis'
import routes from './routes'
import connectDb from './db/mongoose'
// import seedAllModels from './seeder'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({type: 'application/json'}))

const RedisStore = connectRedis(session)

app.use(
  session({
    store: new RedisStore({client}),
    secret: process.env.REDIS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: {message: 'Welcome to Mock Pl api'},
  })
})

app.use(rateLimiter)
app.use(routes)

app.get('*', (req, res) => {
  res.send('Route does not exist')
})

connectDb().then(async () => {
  // eslint-disable-next-line no-console
  // await seedAllModels()
  console.log('mongodb connected')
})

export default app
