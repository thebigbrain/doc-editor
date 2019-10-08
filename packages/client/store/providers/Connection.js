import { Provider } from 'cerebral'
import addListener from '@codesandbox/common/lib/connection-manager'

const listeners = {}

export default Provider({
  addListener(signalPath) {
    const listener = connection =>
      this.context.controller.getSignal(signalPath)({ connection })

    listeners[signalPath] = addListener(listener)
  },
  removeListener(signalPath) {
    if (listeners[signalPath]) {
      listeners[signalPath]()

      delete listeners[signalPath]
    }
  },
})
