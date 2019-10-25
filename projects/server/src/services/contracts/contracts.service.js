// Initializes the `contracts` service on path `/contracts`
const { Contracts } = require('./contracts.class');
const hooks = require('./contracts.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contracts', new Contracts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('contracts');

  service.hooks(hooks);
};
