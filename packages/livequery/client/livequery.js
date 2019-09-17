import React from 'react'
import VirtualTable from './virtual-table'

const SORT = {
  ASC: 1,
  DES: -1
}

async function invokeMongoRemote(name, method, params = {}) {
  let res = await fetch('http://localhost:3080/mongo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      method,
      params
    })
  })

  return await res.json()
}

class LiveQueryService {
  constructor(option = {}) {
    this.option = option
    this.list = []
    this.event = null

    this.virtTable = new VirtualTable()

    // this.query = new Parse.Query(option.service)
    this.subscription = null

    this._listIndex = new Map()
  }

  get pageSize() {
    return this.virtTable.pageSize
  }

  async initialize() {
    // this.subscription = await this.query.subscribe()
  }

  async sort(key, order, limit) {
    const numberOfRecords = Math.ceil(limit / this.pageSize) * this.pageSize
    return null
  }

  filter(list, option) {
    return []
  }

  async find(query = null, options = null) {
    return await invokeMongoRemote(this.option.service, 'find', {query, options})
  }

  get() {

  }

  create() {

  }

  update() {

  }

  remove() {

  }

  bindHook(subscription) {
    const [event, setEvent] = React.useState('')

    React.useEffect(() => {
      if (subscription == null) return

      subscription.on('create', created => {
        setEvent({type: 'create', payload: created})
      })
      subscription.on('update', updated => {
        setEvent({type: 'update', payload: updated})
      })
      subscription.on('delete', removed => {
        setEvent({type: 'remove', payload: removed})
      })

      return () => {
        subscription.unsubscribe()
      }
    }, [subscription])

    return event
  }
}

export function connect(option = {}) {
  if (option.service == null) throw new Error(`service is required`)

  const service = new LiveQueryService(option)

  return (C) => {
    return (props) => {
      const [subscription, setSubscription] = React.useState(service.subscription)

      React.useEffect(() => {
        let isAborted = false
        service.initialize().then(() => {
          if (isAborted) return
          setSubscription(service.subscription)
        })

        return () => {
          isAborted = true
        }
      }, [])

      // service.event = service.bindHook(subscription)

      return <C {...props} collection={service}/>
    }
  }
}
