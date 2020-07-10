/* eslint-disable no-console */
import redis from 'redis'
import moment from 'moment'
import dotenv from 'dotenv'

dotenv.config()

const {MAX_RATE, MIN_CALL_RATE_IN_MINUTES} = process.env

const client = redis.createClient(process.env.REDIS_URL)

client.on('connect', () => {
  console.log('Redis client connected')
})

client.on('error', (err) => {
  console.log(`Something went wrong ${err}`)
})

/* istanbul ignore next */

export const rateLimiter = async (req, res, next) => {
  const id = `rate:${req.sessionID}`
  client.exists(id, (err, exist) => {
    if (err) {
      console.log('Redis not working...')
    }
    if (exist === 1) {
      client.get(id, (_err, reply) => {
        const data = JSON.parse(reply)
        const currentTime = moment().unix()
        const difference = (currentTime - data.startTime) / 60

        if (difference >= MIN_CALL_RATE_IN_MINUTES) {
          const body = {
            count: 1,
            startTime: moment().unix(),
          }
          client.set(id, JSON.stringify(body))
          return next()
        }
        if (difference < MIN_CALL_RATE_IN_MINUTES) {
          if (data.count >= MAX_RATE) {
            return res.status(429).json({
              status: 429,
              message: 'API Request limit exceeded. Please try again later',
            })
          }

          // update cache if api cal is less than min and max rate
          data.count += 1
          client.set(id, JSON.stringify(data))
          return next()
        }
      })
    } else {
      const body = {
        count: 1,
        startTime: moment().unix(),
      }
      client.set(id, JSON.stringify(body))
      return next()
    }
  })
}

export default client
