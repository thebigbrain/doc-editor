import { Parse } from './parse-client'


export async function getCurrentSession() {
  return true
  // return await Parse.Session.current();
}

export async function logOut() {
  return await Parse.User.logOut();
}