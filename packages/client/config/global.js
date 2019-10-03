import NotFound from '../components/NotFound'
import SignIn from '../components/Auth/RouteSignIn'
import SignUp from '../components/Auth/RouteSignUp'

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
