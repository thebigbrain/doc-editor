// Initializes the `notifications` service on path `/notifications`
const { Notifications } = require('./notifications.class');
const hooks = require('./notifications.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/notifications', new Notifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notifications');

  service.hooks(hooks);
};
