import React from 'react'
import {combineReducers, createStore} from 'redux'
import {
  BrowserRouter,
  Link as _Link,
  Redirect as _Redirect,
  Route as _Route,
  Switch as _Switch,
  withRouter as _withRouter,
} from "react-router-dom"
import {getCurrentSession, logOut} from './session'

export const Router = BrowserRouter
export const Route = _Route
export const withRouter = _withRouter
export const Link = _Link
export const Switch = _Switch
export const Redirect = _Redirect

export class Page {
  static pages = new Map()
  static routes = []
  static store = null
  static reducers = {}
  static updater = {}
  static handlers = {}

  constructor(option) {
    this.option = option
  }

  static newInstance(options) {
    let {name, path, component, exact = false, props = {}, i18n, callbacks} = options

    if (name == null) name = options.name = `__page_name_${Math.random()}`

    for (let cb in callbacks) {
      let eventName = callbacks[cb]
      callbacks[cb] = (...args) => this.get(name).emit(eventName, ...args)
    }

    const page = new Page(options)
    this.pages.set(name, page)

    const comp = (routeOptions) => (
      <WrappedComponent
        __internal_page_component={component}
        options={options}
        routeOptions={routeOptions}
        state={Object.assign(props, {i18n})}
        page={page}
        callbacks={callbacks}
      />
    )

    exact = exact === true || path === '/'
    const key = `__page_route_${name}`
    this.routes.push(<Route key={key} exact={exact} path={path} component={comp}/>)

    const reducerKey = Page.convertReducerKey(name)
    Page.reducers[reducerKey] = (state = null, action = {}) => {
      if (action.type === reducerKey) {
        this.updateState(reducerKey, action.payload)
        return Object.assign({}, state, action.payload)
      }
      return state
    }

    return page
  }

  static getRouter() {
    const reducer = combineReducers(this.reducers)
    this.store = createStore(reducer)

    return (
      <BrowserRouter>
        <Route path='/' component={Session}/>
        {this.routes}
      </BrowserRouter>
    )
  }

  static updateState(key, state) {
    if (typeof this.updater[key] === 'function') {
      this.updater[key](state)
    }
  }

  static convertReducerKey(name) {
    return String(name).replace('.', '_')
  }

  static setState(name, state) {
    this.updateState(this.convertReducerKey(name), state)
  }

  static getState() {
    return this.store.getState()
  }

  static get(name) {
    return this.pages.get(name)
  }

  static register(handlers) {
    for (let k in handlers) {
      if (handlers.hasOwnProperty(k) && typeof handlers[k] === 'function') {

        this.handlers[k] = handlers[k]
      }
    }
  }

  setState(state) {
    Page.store.dispatch({
      type: Page.convertReducerKey(this.option.name),
      payload: state
    })
  }

  emit(eventName, ...args) {
    const fn = `${this.option.name}.${eventName}`

    if (Page.handlers[fn] != null) {
      (async () => {
        await Page.handlers[fn](...args)
      })()
    }
  }
}

class WrappedComponent extends React.Component {
  state = {}
  C = null

  constructor(props) {
    super(props)
    this.C = props.__internal_page_component

    this.routeOptions = props.routeOptions
    this.state = props.state
    this.page = props.page
    this.callbacks = props.callbacks
    const options = props.options


    Page.updater[Page.convertReducerKey(options.name)] = (state) => this.setState(state)
  }

  render() {
    return (
      <this.C {...this.routeOptions} {...this.state} {...this.callbacks} page={this.page}/>
    )
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props)

    const {history} = props

    getCurrentSession().then(() => {
      history.replace(this.isRoot() ? '/app' : this.getUrl())
    }).catch(async () => {
      await logOut()
      history.replace(`/user/login?redirect=${this.getRedirect()}`)
    })
  }

  getRedirect() {
    const {location} = this.props
    return location.pathname.startsWith('/user/login') ? '/app' : this.getUrl()
  }

  getUrl() {
    return this.props.location.pathname + this.props.location.search
  }

  isRoot() {
    const {location} = this.props
    return location.pathname === '' || location.pathname === '/' || location.pathname.startsWith('/user')
  }

  render() {
    return null
  }
}
