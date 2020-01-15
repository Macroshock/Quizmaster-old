const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const DB_COLNAME = 'Users'
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'quizmaster';

// Create user
router.post('/', (req, res) => {

  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const client = new MongoClient(DB_URL);
  client.connect(function(err) {
    assert.equal(null, err);
    console.log('Creating user');
  
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLNAME);

    // Insert user in database
    collection.insertOne(user, function(err, result) {
      assert.equal(null, err)
      res.status(201).json(result)
      console.log("User created")
    });
  });

})

// Get user
router.get('/:id', (req, res) => {
  
})

// Get all users
router.get('/', (req, res) => {

  const client = new MongoClient(DB_URL);
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Getting all users")
  
    const db = client.db(DB_NAME);
    const collection = db.collection(DB_COLNAME);

    // Find users in database
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null)
      res.json(docs)
      console.log("Users fetched")
    });
  });

})


// Update user
router.patch('/:id', (req, res) => {
  
})

// Delete user
router.delete('/:id', (req, res) => {
  
})

module.exports = router