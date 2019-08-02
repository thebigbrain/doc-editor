import Parse from './parse-client';


export async function getCurrentSession() {
  return await Parse.Session.current();
}
