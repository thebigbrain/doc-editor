import Parse from 'base/parse-client';
import handler from 'base/handler';


async function loginHandle(username, password) {
  return await Parse.User.logIn(username, password);
}

handler.register({
  'login': loginHandle
});
