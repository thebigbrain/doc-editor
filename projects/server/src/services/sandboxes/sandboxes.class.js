const { Service } = require('feathers-mongodb');

exports.Sandboxes = class Sandboxes extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('sandboxes');
    });
  }
};
