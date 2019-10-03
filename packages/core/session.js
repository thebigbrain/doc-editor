const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const auth = require('@feathersjs/authentication-client')

const debug_url = 'http://localhost:3030'
let app = null

export function initialize(url = debug_url) {
  const socket = io(url)
  app = feathers()

// Setup the transport (Rest, Socket, etc.) here
  app.configure(socketio(socket))

// Available options are listed in the "Options" section
  app.configure(auth())
}

initialize()  // debug only

let token = null

export function getToken() {
  return token
}

export function getService(name) {
  return app.service(name)
}

export async function getAuthentication() {
  return await app.get('authentication')
}

export async function reAuthenticate() {
  return await app.reAuthenticate()
}

export async function getCurrentToken() {
  // if (skipAuth()) return token

  if (token == null) {
    try {
      token = await app.authentication.getAccessToken()
    } catch (e) {
      console.log(e.message)
    }
  }
  return token
}

export async function loginWithEmailPassword(credential) {
  return await app.authenticate({
    strategy: 'local',
    ...credential,
  })
}

export async function signUp(credentials) {
  await app.service('users').create(credentials)
}

export function logOut() {
  return app.logout()
}
