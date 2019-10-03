import {merge, namespaced} from "overmind/config"

const config = merge({
  state: {
    isLanding: true
  },
  actions: {}
}, namespaced({

}))

export default config
