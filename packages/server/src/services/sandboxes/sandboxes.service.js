// Initializes the `sandboxes` service on path `/sandboxes`
const { Sandboxes } = require('./sandboxes.class');
const hooks = require('./sandboxes.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sandboxes', new Sandboxes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sandboxes');

  service.hooks(hooks);
};
