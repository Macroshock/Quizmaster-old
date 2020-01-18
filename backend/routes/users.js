const express = require('express')
const router = express.Router()
const MongoDb = require('mongodb')
const MongoClient = MongoDb.MongoClient
const assert = require('assert')
const jwt = require('jsonwebtoken')
const constants = require('../constants/constants.js')

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
  
  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Find user in database
    collection.findOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
      assert.equal(null, err)

      if (result == null) {
        return res.status(404).json({ message: 'User not found' })
      }

      client.close()
      next()
    })
  })

}

// Create user
router.post('/', (req, res) => {

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Creating user')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Insert user in database
    collection.insertOne(user, function(err, result) {
      assert.equal(null, err)
      res.status(201).json(result)
      console.log('User created')
      client.close()
    })
  })

})

// Get user
router.get('/:id', (req, res) => {

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Getting user')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Find user in database
    collection.findOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
      assert.equal(null, err)
      res.status(200).json(result)
      console.log(`User ${req.params.id} found`)
      client.close()
    })
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

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Getting all users')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Find users in database
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null)
      res.status(200).json(docs)
      console.log('Users fetched')
      client.close()
    })
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

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Updating user')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Delete user in database
    collection.updateOne({ _id: new MongoDb.ObjectID(req.params.id) }, updatedUser, 
                          function(err, result) {
      assert.equal(null, err)
      res.sendStatus(200)
      console.log('User updated')
      client.close()
    })
  })

})

// Delete user
router.delete('/:id', checkUser, (req, res) => {

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Deleting user')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Delete user in database
    collection.deleteOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
      assert.equal(null, err)
      res.sendStatus(204)
      console.log('User deleted')
      client.close()
    })
  })

})

module.exports = router