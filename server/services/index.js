const users = require('./users/users.service.js')
const component = require('./component/component.service.js')
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(component)
}
