// Initializes the `misses` service on path `/misses`
const { Misses } = require('./misses.class');
const hooks = require('./misses.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/misses', new Misses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('misses');

  service.hooks(hooks);
};
