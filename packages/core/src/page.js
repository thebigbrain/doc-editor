import React from 'react'
import {Redirect, Route} from 'react-router'
import WrappedComponent from './components/WrappedComponent'
import Root from './components/Root'
import Session from './components/Session'
// import Login from './components/Login'
// import Register from './components/Register'
// import config from './config'

export {Redirect} from 'react-router'
export * from 'react-router-dom'

const RouteMap = new Map()

function getDefaultRoute(path = '/') {
  return {
    exact: false,
    path,
    wrapProps: {},
    children: new Map(),
    auth: true
  }
}


export class Page {
  static pages = new Map()
  static routes = getDefaultRoute()

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
      authorization = true,
      redirect
    } = options

    if (RouteMap.has(path)) {
      throw `Conflict: route with path ${path} found`
    }

    const name = options.name = path.replace('/', '_')

    const page = new Page(options)
    this.pages.set(name, page)

    const wrapProps = {
      __internal_page_component: component,
      options,
      state: Object.assign(props, {i18n}),
      page,
    }

    exact = exact === true || path === '/'
    const route = {
      exact,
      path,
      wrapProps,
      auth: authorization,
      children: new Map(),
      redirect
    }
    RouteMap.set(path, route)

    this.insertTree(path, route)

    return page
  }

  static insertTree(path, route) {
    let keys = path.replace(/^\//, '').replace(/\/$/, '').split('/')
    let root = this.routes
    let i = 0
    let key = keys[i]
    for (; i < keys.length - 1; i++) {
      let node = root.children.get(key)
      if (node == null) {
        node = getDefaultRoute(`/${keys.slice(0, i + 1).join('/')}`)
        root.children.set(key, node)
      }

      root = node
      key = keys[i + 1]
    }
    root.children.set(key, route)
  }

  static renderRoutes(routes) {
    return Array.from(routes.values()).map((
      {exact, path, wrapProps, children, auth, redirect}
    ) => {
      const key = `__route_key_${String(path).replace(/\//g, '_')}`

      const subRoutes = Page.renderRoutes(children)
      const C = (props) => (
        <Session>
          <WrappedComponent {...props} {...wrapProps}>
            {subRoutes}
            {/*<Route component={config.NotFound}/>*/}
          </WrappedComponent>
        </Session>
      )

      return (
        <Route key={key} exact={exact} path={path} component={C}/>
      )
    })
  }

  static renderRoot() {
    // this.newInstance({path: config.routePath.login, component: Login})
    // this.newInstance({path: config.routePath.register, component: Register})

    return (
      <Root>
        {this.renderRoutes(this.routes.children)}
      </Root>
    )
  }

  static getRouteKey(name) {
    return `__page_route_${name}`
  }

  static get(path) {
    return this.pages.get(String(path).replace('/', '_'))
  }
}

export default Page
