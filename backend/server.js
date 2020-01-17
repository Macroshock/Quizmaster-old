const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const constants = require('./constants/constants.js')

// Constants

// Set up MongoDB database
const client = new MongoClient(constants.DB_URL);

client.connect(function(err) {
  assert.equal(null, err)
  console.log("Connected successfully to database server")

  const db = client.db(constants.DB_NAME);

  client.close()
})

// Set up Express
app.use(express.json())

// Set up the routers
const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

const loginRouter = require('./routes/login.js')
app.use('/login', loginRouter)

app.listen(constants.SERVER_PORT, () => console.log(`Listening on port ${constants.SERVER_PORT}`))
