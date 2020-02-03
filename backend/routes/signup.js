const express = require('express')
const router = express.Router()
const dbhandler = require('../utils/dbhandler.js')

// Constants
const COLLECTION = 'Users'

// Signup
router.post('/', (req, res) => {

  /* In a real case scenario, this would be more complex (validation, confirmation mail etc.) */
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  console.log('Registering user')
  const collection = dbhandler.getCollection(COLLECTION)

  if (!collection) {
    return res.status(500).json({ message: 'Can not register user; database server is not accesible' })
  }

  // Check if user with same email already exists
  new Promise((resolve, reject) => {
      collection.find({ email: user.email }).toArray(function(err, docs) {
      if (err) {
        reject({code: 500, message: err})
        return
      }

      // Check if the user exists
      if (docs.length !== 0) {
        console.log(`User with the email ${user.email} already exists`)
        reject({code: 409, message: 'Email already in use'})
        return
      }

      resolve()
    })
  }).then(() => {
    // Create user
    collection.insertOne(user, function(err, result) {
      
      if (err) {
        reject({code: 500, message: err})
        return
      }

      res.status(201).json({message: 'Registered successfully!'})
      console.log('User registered')
    })
  }).catch(error => {
    res.status(error.code).json({ message: error.message })
  })
  
})

module.exports = router
