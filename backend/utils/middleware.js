const MongoDb = require('mongodb')
const jwt = require('jsonwebtoken')
const constants = require('../utils/constants.js')
const dbhandler = require('../utils/dbhandler.js')

module.exports = {
  // Validate token middleware
  validateToken: function (req, res, next) {

    if(constants.DEBUG) {
      next()
    } else {
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
        res.locals.user = user
        next()
      })
    }

  },

  // Validate user has admin role
  validateAdmin: function (req, res, next) {

    if(constants.DEBUG) {
      next()
    } else {
      if (res.locals.user.role !== 'admin') {
        return res.sendStatus(403)
      }
      next()
    }

  },

  // Middleware to verify that certain user exists
  checkUser: function (req, res, next) {
    
    const collection = dbhandler.getCollection('Users')

    if (!collection) {
      return res.status(500).json({ message: 'Database server is not accesible' })
    }

    // Find user in database
    collection.findOne({ _id: new MongoDb.ObjectID(req.params.id) }, function(err, result) {
      if (err) {
        return res.status(500).json({ message: err })
      }

      if (result === null) {
        return res.status(404).json({ message: 'User not found' })
      }

      next()
    })

  }
}