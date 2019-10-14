const users = require('./users/users.service.js')
const component = require('./component/component.service.js')
const sandboxes = require('./sandboxes/sandboxes.service.js');
const dependencies = require('./dependencies/dependencies.service.js');
const modules = require('./modules/modules.service.js');
const notifications = require('./notifications/notifications.service.js');
const messages = require('./messages/messages.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(component)
  app.configure(sandboxes);
  app.configure(dependencies);
  app.configure(modules);
  app.configure(notifications);
  app.configure(messages);
}
