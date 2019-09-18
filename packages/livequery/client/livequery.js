import React from 'react'
import LiveQueryService from './feather-query'

const SORT = {
  ASC: 1,
  DES: -1
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

      return <C {...props} service={service}/>
    }
  }
}
