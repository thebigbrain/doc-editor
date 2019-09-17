import React from 'react'
import VirtualTable from './virtual-table'

const SORT = {
  ASC: 1,
  DES: -1
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

  async find(option = {}) {
    const found = []
    if (option.$sort) {
      const sorts = Object.keys(option.$sort).map(k => ([k, option.$sort[k]]))
      while (found.length < option.$limit) {
        const list = await this.sort(...sorts[0], option.$limit)
        if (list == null) break
        found.splice(found.length, 0, ...this.filter(list, option))
      }
    }
    return found.slice(0, option.$limit)
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

export function connect(option = {query: {}}) {
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

      return <C {...props} livequery={service}/>
    }
  }
}
