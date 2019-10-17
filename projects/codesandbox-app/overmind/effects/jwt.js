// import store from 'store/dist/store.modern';
// import { identify, resetUserId } from '@csb/common/lib/utils/analytics';
import * as api from './api/feathers'


export async function reAuthenticate() {
  return await api.reAuthenticate()
}

export async function get() {
  return await api.getAccessToken();
}

export async function set(jwt) {
  await api.setAccessToken(jwt)
  await api.reAuthenticate()
}

export function reset() {
  // document.cookie = `signedIn=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  // document.cookie = `jwt=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  //
  // identify('signed_in', 'false');
  // resetUserId();
  //
  // return store.set('jwt', null);
  api.reset()
}
