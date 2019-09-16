import React from 'react'
import { Redirect, Route } from 'react-router'
import WrappedComponent from './components/WrappedComponent'
import Root from './components/Root'
import Session from './components/Session'

export {Redirect} from 'react-router'
export * from 'react-router-dom'

const RouteMap = new Map()

export class Page {
  static pages = new Map()
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
      redirect
    }
    RouteMap.set(path, route)

    return page
  }

  static renderRoutes(routes = []) {
    return Array.from(routes).map((
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

  static prepareRoutes() {
    return []
  }

  static getRoot() {
    const routes = this.prepareRoutes()
    return (
      <Root land={this.Landing}>
        {this.renderRoutes(routes)}
      </Root>
    )
  }

  static getRouteKey(name) {
    return `__page_route_${name}`
  }

  static get(path) {
    return this.pages.get(String(path).replace('/', '_'))
  }

  static setLanding(Landing) {
    Root.withLanding(Landing)
  }
}

export default Page
