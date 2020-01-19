const express = require('express')
const router = express.Router()
const MongoDb = require('mongodb')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants.js')
const dbhandler = require('../utils/dbhandler.js')

// Constants
const COLLECTION = 'Users'

// Validate token middleware
function validateToken(req, res, next) {
  const header = req.headers['authorization']

  // check if the authorization header is missing
  if (!header) {
    return res.sendStatus(401)
  }

  const token = header.split(' ')[1]

  // check if there is a token
  if (!token) {
    return res.sendStatus(401)
  }

  // verify token
  jwt.verify(token, constants.SECRET_KEY, (err, user) => {
    // if there is an error, then the token is not valid
    if (err) {
      return res.sendStatus(403)
    }

    req.user = user
    next()
  })
}

// Middleware to verify that certain user exists
function checkUser(req, res, next) {
  
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.status(500).json({ message: 'Database server is not accesible' })
  }

  // Find user in database
  collection.findOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    if (result == null) {
      return res.status(404).json({ message: 'User not found' })
    }

    next()
  })

}

// Create user
router.post('/', (req, res) => {

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  console.log('Creating user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.status(500).json({ message: 'Can not create user; database server is not accesible' })
  }

  // Insert user in database
  collection.insertOne(user, function(err, result) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    res.status(201).json(result)
    console.log('User created')
  })

})

// Get user
router.get('/:id', (req, res) => {

  console.log('Getting user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.status(500).json({ message: 'Can not get user; database server is not accesible' })
  }

  // Find user in database
  collection.findOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
    if (err) {
      return res.sendStatus(500).json({ message: err })
    }

    res.status(200).json(result)
    console.log(`User ${req.params.id} found`)
  })
  
})

// Get all users
//router.get('/', validateToken, (req, res) => {
router.get('/', (req, res) => {

  // check for admin role
  /*if (req.user.role !== 'admin') {
    console.log(req.user)
    return res.sendStatus(403)
  }*/

  console.log('Getting all users')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.sendStatus(500).json({ message: 'Can not get users; database server is not accesible' })
  }

  // Find users in database
  collection.find({}).toArray(function(err, docs) {
    if (err) {
      return res.sendStatus(500).json({ message: err })
    }

    res.status(200).json(docs)
    console.log('Users fetched')
  })
})


// Update user
router.patch('/:id', checkUser, (req, res) => {
  
  let updatedUser = { $set: { } }

  if (req.body.name) {
    updatedUser.$set.name = req.body.name
  } 

  if (req.body.email) {
    updatedUser.$set.email = req.body.email
  } 

  if (req.body.password) {
    updatedUser.$set.password = req.body.password
  } 

  if (req.body.role) {
    updatedUser.$set.role = req.body.role
  } 

  console.log('Updating user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.sendStatus(500).json({ message: 'Can not update user; database server is not accesible' })
  }

  // Delete user in database
  collection.updateOne({ _id: new MongoDb.ObjectID(req.params.id) }, updatedUser, 
                        function(err, result) {
    if (err) {
      return res.sendStatus(500).json({ message: err })
    }

    res.sendStatus(200)
    console.log('User updated')
  })
})

// Delete user
router.delete('/:id', checkUser, (req, res) => {

  console.log('Deleting user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.sendStatus(500).json({ message: 'Can not update user; database server is not accesible' })
  }

  // Delete user in database
  collection.deleteOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
    if (err) {
      return res.sendStatus(500).json({ message: err })
    }

    res.sendStatus(204)
    console.log('User deleted')
  })

})

module.exports = router