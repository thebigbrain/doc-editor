const { Service } = require('feathers-mongodb');

exports.Modules = class Modules extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('modules');
    });
  }
};
