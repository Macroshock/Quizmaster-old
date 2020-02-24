const constants = require('../utils/constants.js')

function toRoute(str) {
  return `http://${constants.SERVER_DOMAIN}:${constants.SERVER_PORT}/${str}/`
}

module.exports = {
  toRoute: toRoute
}
