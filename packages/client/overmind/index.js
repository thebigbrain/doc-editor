import { merge, namespaced } from 'overmind/config'

const config = merge({
  state: {
    isLanding: true,
  },
})

export default config
