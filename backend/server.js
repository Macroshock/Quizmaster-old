const express = require('express')
const app = express()
const constants = require('./utils/constants.js')
const dbhandler = require('./utils/dbhandler.js')

// Set up MongoDB database
dbhandler.init()

// Set up Express
app.use(express.json())

// Set up the routers
const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

const loginRouter = require('./routes/login.js')
app.use('/login', loginRouter)

app.listen(constants.SERVER_PORT, () => console.log(`Listening on port ${constants.SERVER_PORT}`))
