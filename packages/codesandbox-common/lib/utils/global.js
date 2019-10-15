import {protocolAndHost} from './url-generator'

export function getGlobal() {
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof self !== 'undefined') {
    const returnedGlobal = self
    return returnedGlobal
  }
  if (typeof global !== 'undefined') {
    return global
  }
  return {}
}

const global = getGlobal()

/**
 * A postmessage that works in main window and in worker.
 * It will send the message to the default origin.
 * @param message The message to send
 */
export function commonPostMessage(message) {
  if (typeof Window !== 'undefined') {
    global.postMessage(message, protocolAndHost())
  } else {
    global.postMessage(message)
  }
}
