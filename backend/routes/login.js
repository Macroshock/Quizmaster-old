const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const jwt = require('jsonwebtoken')
const constants = require('../constants/constants.js')

// Constants
const COLLECTION = 'Users'

// Login
router.post('/', (req, res) => {

  let credentials = {
    email: req.body.email,
    password: req.body.password
  }

  const client = new MongoClient(constants.DB_URL)
  client.connect(function(err) {
    assert.equal(null, err)
    console.log('Authenticating user')
  
    const db = client.db(constants.DB_NAME)
    const collection = db.collection(COLLECTION)

    // Find user by email
    collection.find({ email: credentials.email }).toArray(function(err, docs) {
      assert.equal(err, null)

      // Check if the user exists
      if (docs.length == 0) {
        console.log(`User ${credentials.email} not found`)
        return res.status(404).json({ message: 'User not found' })
      }
      const user = docs[0]

      // Check if the passwords match
      if (user.password !== credentials.password) {
        console.log(`Password ${credentials.password} does not match with ${user.password}`)
        return res.status(401).json({ message: 'Wrong password' })
      }

      // Create and send token
      const payload = { userId: user._id, email: user.email, role: user.role }
      const token = jwt.sign(payload, constants.SECRET_KEY)
      res.json({ token })
      console.log('Token granted')
    })
  })

})

module.exports = router