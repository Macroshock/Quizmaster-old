const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Constants
const PORT = 8000
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'quizmaster';

// Set up MongoDB database
const client = new MongoClient(DB_URL);

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to database server");

  const db = client.db(DB_NAME);

  client.close();
})

// Set up Express
app.use(express.json())

const usersRouter = require('./routes/users/users.js')
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
