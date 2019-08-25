import {Page, Parse} from '@doce/core'
import {LoginStatus} from 'utils/const'

const USER = 'user'
const LOGIN = 'login'
const SIGNUP = 'register'

async function login({username, password}) {
  try {
    await Parse.User.logIn(username, password)
    Page.get(USER).setState({status: LoginStatus.SUCCESS, error: null})
  } catch (error) {
    console.log(error)
    Page.get(USER).setState({
      status: LoginStatus.FAILED,
      error
    })
  }
}

async function mobileLogin(authData) {
  try {
    const provider = {
      authenticate: () => Promise.resolve(),
      restoreAuthentication() {
        return true
      },

      getAuthType() {
        return 'mobile'
      },

      getAuthData() {
        return {authData}
      },
    }
    Parse.User._registerAuthenticationProvider(provider)
    const user = new Parse.User()
    // user.setUsername('Alice');
    // user.setPassword('sekrit');
    // await user.signUp();
    await user._linkWith(provider.getAuthType(), provider.getAuthData())

    // const user = new Parse.User();
    // await user._linkWith('phone', { authData });

    Page.get(USER).setState({status: LoginStatus.SUCCESS, error: null})
  } catch (error) {
    Page.get(USER).setState({status: LoginStatus.FAILED, error})
  }
}

async function signUp({username, password, email, phone}) {
  try {
    const user = new Parse.User()
    user.set("username", username)
    user.set("password", password)
    user.set("email", email)

    // other fields can be set just like with Parse.Object
    user.set("phone", phone)
    await user.signUp()

    Page.get(USER).setState({status: LoginStatus.SUCCESS, error: null})
  } catch (error) {
    Page.get(USER).setState({status: LoginStatus.FAILED, error})
  }
}

Page.register({
  'user.mobile': mobileLogin,
  [`${USER}.${LOGIN}`]: login,
  [`${USER}.${SIGNUP}`]: signUp
})
