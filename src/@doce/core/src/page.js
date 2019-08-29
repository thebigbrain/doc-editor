import React from 'react'
import {combineReducers, createStore} from 'redux'
import {Redirect, Route} from "react-router"
import WrappedComponent from './components/WrappedComponent'
import Root from './components/Root'
import Session from "@doce/core/src/components/Session"

export {Redirect} from 'react-router'
export * from 'react-router-dom'

const RouteMap = new Map()

export class Page {
  static pages = new Map()
  static routes = new Map()
  static store = null
  static reducers = {}
  static updater = {}
  static handlers = {}

  static Landing = null

  constructor(option) {
    this.option = option
  }

  static newInstance(options) {
    let {
      path,
      component,
      exact = false,
      props = {},
      i18n,
      // callbacks,
      authorization = true,
      redirect
    } = options

    if (RouteMap.has(path)) {
      throw `Conflict: route with path ${path} found`
    }

    const name = options.name = path.replace('/', '_')

    // for (let cb in callbacks) {
    //   let eventName = callbacks[cb]
    //   callbacks[cb] = (...args) => this.get(name).emit(eventName, ...args)
    // }

    const page = new Page(options)
    this.pages.set(name, page)

    const wrapProps = {
      __internal_page_component: component,
      options,
      state: Object.assign(props, {i18n}),
      page,
      // callbacks,
      setUpdater: updater => this.updater[this.getReducerKey(name)] = updater
    }

    exact = exact === true || path === '/'

    const parentRoute = this.findDeepestParentRoute(this.routes, path)
    const route = {
      exact,
      path,
      wrapProps,
      children: new Map(),
      auth: authorization,
      redirect
    }
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
    return Array.from(routes.values()).map((
      {exact, path, wrapProps, children, auth, redirect}
    ) => {
      const key = `__route_key_${String(path).replace(/\//g, '_')}`

      const subRoutes = Page.renderRoutes(children)
      const C = (props) => (
        <Session skip={auth === false}>
          <WrappedComponent {...props} {...wrapProps}>
            {subRoutes}
          </WrappedComponent>
        </Session>
      )
      return (
        <Route key={key} exact={exact} path={path} component={C}/>
      )
    })
  }

  static getRoot() {
    const reducer = combineReducers(this.reducers)
    this.store = createStore(reducer)

    return (
      <Root land={this.Landing}>
        {this.renderRoutes(this.routes)}
      </Root>
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
    return '__reducer_' + String(name)
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

  // static register(services) {
  //   for (let k in services) {
  //     if (services.hasOwnProperty(k) && typeof services[k] === 'function') {
  //
  //       this.services[k] = services[k]
  //     }
  //   }
  // }

  static setLanding(Landing) {
    Root.withLanding(Landing)
  }

  setState(state) {
    Page.store.dispatch({
      type: Page.getReducerKey(this.option.name),
      payload: state
    })
  }

  // emit(eventName, ...args) {
  //   const fn = `${this.option.name}.${eventName}`
  //
  //   if (Page.services[fn] != null) {
  //     (async () => {
  //       await Page.services[fn](...args)
  //     })()
  //   }
  // }
}

export default Page
