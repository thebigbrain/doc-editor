import {Client} from 'ot'

function operationToElixir(ot) {
  return ot.map(op => {
    if (typeof op === 'number') {
      if (op < 0) {
        return {d: -op}
      }

      return op
    }

    return {i: op}
  })
}

class CodeSandboxOTClient extends Client {
  moduleShortid
  onSendOperation
  onApplyOperation

  constructor(
    revision,
    moduleShortid,
    onSendOperation,
    onApplyOperation,
  ) {
    super(revision)
    this.moduleShortid = moduleShortid
    this.onSendOperation = onSendOperation
    this.onApplyOperation = onApplyOperation
  }

  sendOperation(revision, operation) {
    this.onSendOperation(revision, operationToElixir(operation.toJSON()))
  }

  applyOperation(operation) {
    this.onApplyOperation(operation)
  }

  serverReconnect() {
    super.serverReconnect()
  }

  serverAck() {
    super.serverAck()
  }

  applyClient(operation) {
    super.applyClient(operation)
  }

  applyServer(operation) {
    super.applyServer(operation)
  }
}

export default (
  sendOperation,
  applyOperation,
) => {
  const modules = new Map()

  return {
    getAll() {
      return Array.from(modules.values())
    },
    get(moduleShortid, revision = 0, force = false) {
      let client = modules.get(moduleShortid)

      if (!client || force) {
        client = this.create(moduleShortid, revision)
      }

      return client
    },
    create(moduleShortid, initialRevision) {
      const client = new CodeSandboxOTClient(
        initialRevision,
        moduleShortid,
        (revision, operation) => {
          sendOperation(moduleShortid, revision, operation)
        },
        operation => {
          applyOperation(moduleShortid, operation)
        },
      )
      modules.set(moduleShortid, client)

      return client
    },
    clear() {
      modules.clear()
    },
  }
};
