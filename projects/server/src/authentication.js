const {AuthenticationService, JWTStrategy} = require('@feathersjs/authentication')
const {LocalStrategy} = require('@feathersjs/authentication-local')
const {expressOauth} = require('@feathersjs/authentication-oauth')
const GithubStrategy = require('./strategy/github')

module.exports = app => {
  const authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())
  authentication.register('github', new GithubStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
