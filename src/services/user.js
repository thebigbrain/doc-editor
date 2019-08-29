import {Parse} from '@doce/core'

export async function login(username, password) {
  return await Parse.User.logIn(username, password)
}

export async function mobileLogin(authData) {
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

  return user
}

async function signUp({username, password, email, phone}) {
  const user = new Parse.User()
  user.set("username", username)
  user.set("password", password)
  user.set("email", email)

  // other fields can be set just like with Parse.Object
  user.set("phone", phone)
  await user.signUp()

  return user
}
