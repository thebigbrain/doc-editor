// Initializes the `messages` service on path `/messages`
const { Messages } = require('./messages.class');
const hooks = require('./messages.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/messages', new Messages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('messages');

  service.hooks(hooks);
};