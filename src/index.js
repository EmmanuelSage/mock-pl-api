import app from './app'

const port = process.env.PORT || 3000

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
