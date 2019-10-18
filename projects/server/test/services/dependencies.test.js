const app = require('../../src/app');

describe('\'dependencies\' service', () => {
  it('registered the service', () => {
    const service = app.service('dependencies');
    expect(service).toBeTruthy();
  });
});
