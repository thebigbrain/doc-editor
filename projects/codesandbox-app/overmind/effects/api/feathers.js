import io from 'socket.io-client';
import feathers from '@feathersjs/client';

let app = null;

export async function reAuthenticate() {
  return await app.reAuthenticate();
}

export async function getAccessToken() {
  return await app.authentication.getAccessToken();
}

export async function setAccessToken(token) {
  return await app.authentication.setAccessToken(token);
}

export function reset() {
  return app.authentication.reset();
}

export async function getCurrentUser() {
  const { user } = await app.get('authentication');
  return user;
}

export function getAuthService() {
  return app.authentication;
}

export function getService(name) {
  return app.service(name);
}

export function initialize(option = { url: null }) {
  if (app != null) return;

  if (!option.url) throw 'url is required';

  const socket = io(option.url);
  app = feathers();

  app.configure(feathers.socketio(socket));
  app.configure(feathers.authentication());
}

export async function login(credentials) {
  return await app.authenticate({
    strategy: 'local',
    ...credentials,
  });
}

export async function signUp(credentials) {
  // First create the user
  return await app.service('users').create(credentials);
}

export function logout() {
  return app.logout();
}
