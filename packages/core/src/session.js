const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio-client')
const io = require('socket.io-client')
const auth = require('@feathersjs/authentication-client')

const socket = io('http://localhost:3030')
const app = feathers()

// Setup the transport (Rest, Socket, etc.) here
app.configure(socketio(socket))

// Available options are listed in the "Options" section
app.configure(auth())

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

export async function getCurrentSession() {
  if (token == null) {
    token = await app.authentication.getAccessToken()
  }
  return token
}

export async function loginWithEmailPassword(email, password) {
  try {
    await app.authenticate({
      strategy: 'local',
      email: email,
      password: password
    })
  } catch (e) {
    console.error('Authentication error', e)
  }
}

export function logOut() {
  return app.logout()
}
