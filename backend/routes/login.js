const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants.js')
const dbhandler = require('../utils/dbhandler.js')

// Constants
const COLLECTION = 'Users'

// Login
router.post('/', (req, res) => {

  let credentials = {
    email: req.body.email,
    password: req.body.password
  }

  console.log('Authenticating user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.status(500).json({ message: 'Database server is not accesible' })
  }

  // Find user by email
  collection.find({ email: credentials.email }).toArray(function(err, docs) {
    if (err) {
      return res.status(500).json({ message: err })
    }

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

module.exports = router