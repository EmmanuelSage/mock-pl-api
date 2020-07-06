import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: {message: 'Welcome to Mock Pl api'},
  })
})

export default app
