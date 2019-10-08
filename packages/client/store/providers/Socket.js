import { Provider } from 'cerebral'
import { Socket } from 'phoenix'
import _debug from '@codesandbox/common/lib/utils/debug'

let socket = null
const debug = _debug('cs:socket')

export default Provider({
  connect() {
    const { state, jwt } = this.context
    const token = state.get('jwt') || jwt.get()

    if (!socket) {
      socket = new Socket(`wss://${document.location.host}/socket`, {
        params: {
          guardian_token: token,
        },
      })

      socket.connect()
      window.socket = socket
      debug('Connecting to socket', socket)
    }
  },

  getSocket() {
    if (!socket) {
      this.context.socket.connect()
    }

    return socket
  },
})
