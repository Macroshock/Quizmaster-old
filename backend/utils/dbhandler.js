const MongoClient = require('mongodb').MongoClient
const constants = require('../utils/constants.js')

let client
let db

function init() {
  client = new MongoClient(constants.DB_URL)

  client.connect(function(err) {
    if (err) {
      console.log("ERROR: Can not connect to database.", err)
    }

    db = client.db(constants.DB_NAME)
    console.log("Connected successfully to database server")
  })
}

function close() {
  if (client) {
    client.close()
  } else {
    console.log('ERROR: Can not close; connection to database is not established')
  }
}

function getCollection(collection) {
  if (db) {
    return db.collection(collection)
  } else {
    console.log('ERROR: Can not get collection; connection to database is not established')
    return null
  }
}

module.exports = ({
  init: init,
  getCollection: getCollection
})