/* Constants are stored in this file, Object.freeze is used to
prevent the object's properties from being changed */

module.exports = Object.freeze({
  DEBUG: true,
  SERVER_PORT: 8000,
  SERVER_DOMAIN: 'localhost',
  DB_URL: 'mongodb://localhost:27017',
  DB_NAME: 'quizmaster',
  SECRET_KEY: 'thesecretkey'
})