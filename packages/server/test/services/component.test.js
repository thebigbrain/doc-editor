const app = require('../../src/app')

describe('\'Component\' service', () => {
  it('registered the service', () => {
    const service = app.service('component')
    expect(service).toBeTruthy()
  })
})
