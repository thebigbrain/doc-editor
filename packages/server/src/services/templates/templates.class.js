const { Service } = require('feathers-mongodb');

exports.Templates = class Templates extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('templates');
    });
  }
};
