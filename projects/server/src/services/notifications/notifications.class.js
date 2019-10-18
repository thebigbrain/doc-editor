const { Service } = require('feathers-mongodb');

exports.Notifications = class Notifications extends Service {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('notifications');
    });
  }
};
