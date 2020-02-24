const express = require('express')
const router = express.Router()
const MongoDb = require('mongodb')
const constants = require('../utils/constants.js')
const dbhandler = require('../utils/dbhandler.js')
const mw = require('../utils/middleware.js')

// Create user
router.post('/', mw.validateToken, mw.validateAdmin, (req, res) => {

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  }

  console.log('Creating user')
  const collection = dbhandler.getCollection('Users')

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
router.get('/:email', (req, res) => {

  console.log('Getting user')
  const collection = dbhandler.getCollection('Users')

  if (!collection) {
    return res.status(500).json({ message: 'Can not get user; database server is not accesible' })
  }

  // Find user in database
  collection.findOne({ email: req.params.email }, function(err, result) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    if(!result) {
      console.log(`User ${req.params.email} not found`)
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(result)
    console.log(`User ${req.params.email} found`)
  })
  
})

// Get all users
router.get('/', mw.validateToken, mw.validateAdmin, (req, res) => {

  console.log('Getting all users')
  const collection = dbhandler.getCollection('Users')

  if (!collection) {
    return res.status(500).json({ message: 'Can not get users; database server is not accesible' })
  }

  // Find users in database
  collection.find({}).toArray(function(err, docs) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    res.status(200).json(docs)
    console.log('Users fetched')
  })
})

// Update user
router.patch('/:email', mw.validateToken, mw.validateAdmin, mw.checkUser, (req, res) => {
  
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
  const collection = dbhandler.getCollection('Users')

  if (!collection) {
    return res.status(500).json({ message: 'Can not update user; database server is not accesible' })
  }

  // Update user in database
  collection.updateOne({ email: req.params.email }, updatedUser, 
                        function(err, result) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    res.sendStatus(200)
    console.log(`User ${req.params.email} updated`)
  })
})

// Delete user
router.delete('/:email', mw.validateToken, mw.validateAdmin, mw.checkUser, (req, res) => {

  console.log('Deleting user')
  const collection = dbhandler.getCollection('Users')

  if (!collection) {
    return res.status(500).json({ message: 'Can not update user; database server is not accesible' })
  }

  // Delete user in database
  collection.deleteOne({ email: req.params.email }, function(err, result) {
    if (err) {
      return res.status(500).json({ message: err })
    }

    res.sendStatus(204)
    console.log(`User ${req.params.email} deleted`)
  })

})

module.exports = router
