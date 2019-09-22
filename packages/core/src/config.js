import NotFound from './components/NotFound'

const config = {
  disableAuth: true,
  NotFound,
  routePath: {
    app: '/app',
    login: '/login',
    register: '/register'
  },
  skipAuth: []
}

config.skipAuth.push(
  config.routePath.login,
  config.routePath.register
)

export default config
