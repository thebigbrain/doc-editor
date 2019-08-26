import React from 'react'
import {combineReducers, createStore} from 'redux'
import {Route, Router,} from "react-router-dom"
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider, withTheme} from '@material-ui/styles'
import {createBrowserHistory} from 'history'

export * from 'react-router-dom'

// export const Router = _Router
// export const Route = _Route
// export const withRouter = _withRouter
// export const Link = _Link
// export const Switch = _Switch
// export const Redirect = _Redirect

const RouteMap = new Map()
const history = createBrowserHistory()

export class Page {
  static theme = createMuiTheme()
  static pages = new Map()
  static routes = new Map()
  static store = null
  static reducers = {}
  static updater = {}
  static handlers = {}

  constructor(option) {
    this.option = option
  }

  static newInstance(options) {
    let {path, component, exact = false, props = {}, i18n, callbacks} = options

    const name = options.name = path.replace('/', '_')

    for (let cb in callbacks) {
      let eventName = callbacks[cb]
      callbacks[cb] = (...args) => this.get(name).emit(eventName, ...args)
    }

    const page = new Page(options)
    this.pages.set(name, page)

    const wrapProps = {
      __internal_page_component: component,
      options,
      state: Object.assign(props, {i18n}),
      page,
      callbacks,
    }

    exact = exact === true || path === '/'
    if (RouteMap.has(path)) {
      throw `Conflict: route with path ${path} found`
    }

    const parentRoute = this.findDeepestParentRoute(this.routes, path)
    const route = {exact, path, wrapProps, children: new Map()}
    if (parentRoute != null) {
      parentRoute.children.set(path, route)
    } else {
      this.routes.set(path, route)
    }

    RouteMap.set(path, route)

    const reducerKey = Page.getReducerKey(name)
    Page.reducers[reducerKey] = (state = null, action = {}) => {
      if (action.type === reducerKey) {
        this.updateState(reducerKey, action.payload)
        return Object.assign({}, state, action.payload)
      }
      return state
    }

    return page
  }

  static findDeepestParentRoute(routes, key) {
    const keys = Array.from(routes.keys())
    const parentKey = keys.find(k => key.startsWith(k))
    if (parentKey != null) {
      const parent = routes.get(parentKey)
      return this.findDeepestParentRoute(parent.children, key) || parent
    }
    return null
  }

  static renderRoutes(routes) {
    return Array.from(routes.values()).map(({exact, path, wrapProps, children}) => {
      const key = `__route_key_${String(path).replace('/', '_')}`
      console.log(key, exact)
      const subRoutes = Page.renderRoutes(children)
      const C = (props) => (
        <WrappedComponent {...props} {...wrapProps}>
          {subRoutes}
        </WrappedComponent>
      )
      return (
        <Route key={key} exact={exact} path={path} component={C}/>
      )
    })
  }

  static getRouter() {
    const reducer = combineReducers(this.reducers)
    this.store = createStore(reducer)

    return (
      <ThemeProvider theme={this.theme}>
        <Router history={history}>
          {this.renderRoutes(this.routes)}
        </Router>
      </ThemeProvider>
    )
  }

  static updateState(key, state) {
    if (typeof this.updater[key] === 'function') {
      this.updater[key](state)
    }
  }

  static getRouteKey(name) {
    return `__page_route_${name}`
  }

  static getReducerKey(name) {
    return '__reducer_' + String(name).replace('.', '_')
  }

  static setState(name, state) {
    this.updateState(this.getReducerKey(name), state)
  }

  static getState() {
    return this.store.getState()
  }

  static get(path) {
    return this.pages.get(String(path).replace('/', '_'))
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
      type: Page.getReducerKey(this.option.name),
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

class _WrappedComponent extends React.Component {
  state = {}
  C = null

  constructor(props) {
    super(props)
    this.C = props.__internal_page_component

    this.routeProps = props.routeProps
    this.state = props.state
    this.page = props.page
    this.callbacks = props.callbacks
    const options = props.options

    Page.updater[Page.getReducerKey(options.name)] = (state) => this.setState(state)
  }

  render() {
    console.log(this.props.children)

    return (
      <Session>
        <this.C
          {...this.routeProps}
          {...this.state}
          {...this.callbacks}
          page={this.page}
          theme={this.props.theme}
        >
          {this.props.children}
        </this.C>
      </Session>
    )
  }
}

const WrappedComponent = withTheme(_WrappedComponent)

class Session extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Page
