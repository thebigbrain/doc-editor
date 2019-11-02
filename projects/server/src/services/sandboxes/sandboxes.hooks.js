const { authenticate } = require('@feathersjs/authentication').hooks;
const {createIfNotFound} = require('../../hooks/sandboxes')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [createIfNotFound()],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
