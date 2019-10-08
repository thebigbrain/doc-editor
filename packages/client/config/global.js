import NotFound from '../../codesandbox-app/pages/NotFound'
import SignIn from '../../codesandbox-app/pages/Auth/RouteSignIn'
import SignUp from '../../codesandbox-app/pages/Auth/RouteSignUp'

const config = {
  disableAuth: true,
  NotFound,
  SignIn,
  SignUp,
  routePath: {
    app: '/app',
    login: '/login',
    register: '/register',
    forgot: '/forgot'
  },
  skipAuth: []
}

config.skipAuth.push(
  index.routePath.login,
  index.routePath.register
)

export default config
