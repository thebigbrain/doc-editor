const { Service } = require('feathers-mongodb');

exports.Misses = class Misses extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('misses');
    });
  }
};
