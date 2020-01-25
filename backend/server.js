const express = require('express')
const app = express()
const constants = require('./utils/constants.js')
const dbhandler = require('./utils/dbhandler.js')

// Set up MongoDB database
dbhandler.init()

// Set up Express
app.use(express.json())

// Set up HTTP config
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return(res.status(200).json({}))
  }
  next()
})

// Set up the routers
const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

const loginRouter = require('./routes/login.js')
app.use('/login', loginRouter)

app.listen(constants.SERVER_PORT, () => console.log(`Listening on port ${constants.SERVER_PORT}`))
