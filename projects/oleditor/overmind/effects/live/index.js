import {Socket} from 'phoenix'
import _debug from '@csb/common/lib/utils/debug'
import uuid from 'uuid'
import {TextOperation} from 'ot'
import {camelizeKeys} from 'humps'
import {getTextOperation} from '@csb/common/lib/utils/diff'
import clientsFactory from './clients'

const identifier = uuid.v4()
const sentMessages = new Map()
const debug = _debug('cs:socket')

let channel = null
let messageIndex = 0
let clients
let _socket = null
let provideJwtToken = null

export default {
  initialize(options) {
    const live = this

    clients = clientsFactory(
      (moduleShortid, revision, operation) => {
        live.send('operation', {
          moduleShortid,
          operation,
          revision,
        })
      },
      (moduleShortid, operation) => {
        options.onApplyOperation({
          moduleShortid,
          operation,
        })
      },
    )
    provideJwtToken = options.provideJwtToken
  },
  getSocket() {
    return _socket || this.connect()
  },
  connect() {
    if (!_socket) {
      _socket = new Socket(`wss://${location.host}/socket`, {
        params: {
          guardian_token: provideJwtToken(),
        },
      })

      _socket.connect()
      window.socket = _socket
      debug('Connecting to socket', _socket)
    }

    return _socket
  },
  disconnect() {
    if (!channel) {
      return Promise.resolve({})
    }

    return new Promise((resolve, reject) => {
      channel
        .leave()
        .receive('ok', resp => {
          channel.onMessage = d => d
          channel = null
          sentMessages.clear()
          messageIndex = 0

          return resolve(resp)
        })
        // eslint-disable-next-line prefer-promise-reject-errors
        .receive('error', resp => reject(resp))
    })
  },
  joinChannel(roomId) {
    channel = this.getSocket().channel(`live:${roomId}`, {})

    return new Promise((resolve, reject) => {
      channel
        .join()
        .receive('ok', resp =>
          resolve(camelizeKeys(resp)),
        )
        .receive('error', resp => reject(camelizeKeys(resp)))
    })
  },
  // TODO: Need to take an action here
  listen(
    action
  ) {
    channel.onMessage = (event, data) => {
      const disconnected = data == null && event === 'phx_error'
      const alteredEvent = disconnected ? 'connection-loss' : event

      const _isOwnMessage = Boolean(
        data && data._messageId && sentMessages.delete(data._messageId),
      )

      action({
        event: alteredEvent,
        _isOwnMessage,
        data: data == null ? {} : data,
      })

      return data
    }
  },
  send(event, payload) {
    const _messageId = identifier + messageIndex++
    // eslint-disable-next-line
    payload._messageId = _messageId
    sentMessages.set(_messageId, payload)

    return new Promise((resolve, reject) => {
      if (channel) {
        channel
          .push(event, payload)
          .receive('ok', resolve)
          .receive('error', reject)
      } else {
        // we might try to send messages even when not on live, just
        // ignore it
        resolve()
      }
    })
  },
  sendModuleUpdate(module) {
    return this.send('module:updated', {
      type: 'module',
      moduleShortid: module.shortid,
      module,
    })
  },
  sendDirectoryUpdate(directory) {
    return this.send('directory:updated', {
      type: 'directory',
      directoryShortid: directory.shortid,
      module: directory,
    })
  },
  sendCodeUpdate(moduleShortid, currentCode, code) {
    if (currentCode === code) {
      return
    }

    const operation = getTextOperation(currentCode, code)

    if (!operation) {
      return
    }

    try {
      clients.get(moduleShortid).applyClient(operation)
    } catch (e) {
      // Something went wrong, probably a sync mismatch. Request new version
      console.error(
        'Something went wrong with applying OT operation',
        moduleShortid,
        operation,
      )
      this.send('live:module_state', {})
    }
  },
  sendUserCurrentModule(moduleShortid) {
    return this.send('user:current-module', {
      moduleShortid,
    })
  },
  sendDirectoryCreated(directory) {
    return this.send('directory:created', {
      type: 'directory',
      module: directory,
    })
  },
  sendDirectoryDeleted(directoryShortid) {
    this.send('directory:deleted', {
      type: 'directory',
      directoryShortid,
    })
  },
  sendModuleCreated(module) {
    return this.send('module:created', {
      type: 'module',
      moduleShortid: module.shortid,
      module,
    })
  },
  sendModuleDeleted(moduleShortid) {
    return this.send('module:deleted', {
      type: 'module',
      moduleShortid,
    })
  },
  sendMassCreatedModules(modules, directories) {
    return this.send('module:mass-created', {
      directories,
      modules,
    })
  },
  sendLiveMode(mode) {
    return this.send('live:mode', {
      mode,
    })
  },
  sendEditorAdded(liveUserId) {
    return this.send('live:add-editor', {
      editor_user_id: liveUserId,
    })
  },
  sendEditorRemoved(liveUserId) {
    return this.send('live:remove-editor', {
      editor_user_id: liveUserId,
    })
  },
  sendClosed() {
    return this.send('live:close', {})
  },
  sendChat(message) {
    return this.send('chat', {
      message,
    })
  },
  sendModuleState() {
    return this.send('live:module_state', {})
  },
  sendModuleSaved(module) {
    return this.send('module:saved', {
      type: 'module',
      module,
      moduleShortid: module.shortid,
    })
  },
  sendChatEnabled(enabled) {
    return this.send('live:chat_enabled', {enabled})
  },
  sendModuleUpdateRequest() {
    return this.send('live:module_state', {})
  },
  sendUserSelection(moduleShortid, liveUserId, selection) {
    return this.send('user:selection', {
      liveUserId,
      moduleShortid,
      selection,
    })
  },
  getAllClients() {
    return clients.getAll()
  },
  applyClient(moduleShortid, operation) {
    return clients
      .get(moduleShortid)
      .applyClient(TextOperation.fromJSON(operation))
  },
  applyServer(moduleShortid, operation) {
    return clients
      .get(moduleShortid)
      .applyServer(TextOperation.fromJSON(operation))
  },
  serverAck(moduleShortid) {
    return clients.get(moduleShortid).serverAck()
  },
  createClient(moduleShortid, revision) {
    return clients.create(moduleShortid, revision)
  },
  resetClients() {
    clients.clear()
  },
}
