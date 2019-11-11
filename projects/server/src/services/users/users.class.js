const {Service} = require('feathers-mongodb');

exports.Users = class Users extends Service {
  constructor(options, app) {
    super(options);

    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
      this.pendingRequests.forEach((cb) => {
        if (cb) cb();
      });

      this.pendingRequests.clear();
    });

    this.pendingRequests = new Set();
  }

  waitForModal() {
    return new Promise(resolve => {
      this.pendingRequests.add(resolve);
    });
  }

  async get(id, params) {
    if (this.Model == null) await this.waitForModal();
    return await super.get(id, params);
  }
};
