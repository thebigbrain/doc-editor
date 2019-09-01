import React from 'react'
import Parse from './parse-client'


async function fetchList(serviceName, q = {}) {
  const Class = Parse.Object.extend(serviceName)
  const query = new Parse.Query(Class)
  return await query.find()
}

function subscribe() {

}

function unsubscribe() {

}

class LiveQueryService {
  constructor() {
    this.list = []
    this.created = null
    this.updated = null
    this.removed = null
  }

  get() {

  }

  create() {

  }

  update() {

  }

  remove() {

  }
}

export function connect(option = {}) {
  if (option.service == null) throw `service is required`

  const service = new LiveQueryService()

  return (C) => {
    return (props) => (
      <LiveWrapper option={option} service={service}>
        <C {...props}/>
      </LiveWrapper>
    )
  }
}

class LiveWrapper extends React.Component {
  state = {
    list: null
  }

  unmounted = false

  componentDidMount() {
    fetchList(this.props.option.service).then(results => {
      if (this.unmounted) return
      this.setState({list: results})
    })

    subscribe()
  }

  componentWillUnmount() {
    unsubscribe()
    this.unmounted = true
  }

  render() {
    this.props.service.list = this.state.list

    React.Children.only(this.props.children)

    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {service: this.props.service})
    })
  }
}
