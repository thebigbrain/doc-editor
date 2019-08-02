import Parse from 'base/parse-client';
import Page from 'base/page';
import { LoginStatus } from 'base/const';

const USER = 'user';
const LOGIN = 'login';
const SIGNUP = 'register';

async function login({username, password}) {
  try {
    await Parse.User.logIn(username, password);
    Page.get(USER).setState({status: LoginStatus.SUCCESS})
  } catch (e) {
    Page.get(USER).setState({status: LoginStatus.FAILED});
  }
}

async function signUp({username, password, email, phone}) {
  try {
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    // other fields can be set just like with Parse.Object
    user.set("phone", phone);
    await user.signUp();

    Page.get(USER).setState({status: LoginStatus.SUCCESS})
  } catch (e) {
    Page.get(USER).setState({status: LoginStatus.FAILED});
  }
}

Page.register({
  [`${USER}.${LOGIN}`]: login,
  [`${USER}.${SIGNUP}`]: signUp
});
