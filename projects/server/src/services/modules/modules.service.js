// Initializes the `modules` service on path `/modules`
const { Modules } = require('./modules.class');
const hooks = require('./modules.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/modules', new Modules(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('modules');

  service.hooks(hooks);
};
