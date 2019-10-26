const app = require('../../src/app');

describe('\'misses\' service', () => {
  it('registered the service', () => {
    const service = app.service('misses');
    expect(service).toBeTruthy();
  });
});
