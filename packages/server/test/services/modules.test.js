const app = require('../../src/app');

describe('\'modules\' service', () => {
  it('registered the service', () => {
    const service = app.service('modules');
    expect(service).toBeTruthy();
  });
});
