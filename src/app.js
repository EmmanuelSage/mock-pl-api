import express from 'express'
import bodyParser from 'body-parser'
// import cors from 'cors'
import routes from './routes'
import './db/mongoose'

const app = express()

// app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({type: 'application/json'}))

app.use(routes)

app.get('/', (req, res) => {
  res.status(200).send({
    status: 200,
    data: {message: 'Welcome to Mock Pl api'},
  })
})

export default app
