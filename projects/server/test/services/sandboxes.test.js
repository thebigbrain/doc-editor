const app = require('../../src/app');

describe('\'sandboxes\' service', () => {
  it('registered the service', () => {
    const service = app.service('sandboxes');
    expect(service).toBeTruthy();
  });
});
