const { Service } = require('feathers-mongodb');

exports.Contracts = class Contracts extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('contracts');
    });
  }
};
