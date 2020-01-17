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

// Set up the routers
const usersRouter = require('./routes/users.js')
app.use('/users', usersRouter)

const loginRouter = require('./routes/login.js')
app.use('/login', loginRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
