// Initializes the `dependencies` service on path `/dependencies`
const { Dependencies } = require('./dependencies.class');
const hooks = require('./dependencies.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/dependencies', new Dependencies(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('dependencies');

  service.hooks(hooks);
};
