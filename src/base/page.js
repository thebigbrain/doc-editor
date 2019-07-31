import React from 'react';
import {
  Route as _Route,
  Link as _Link,
  withRouter as _withRouter,
  Switch as _Switch
} from "react-router-dom";

export const Route = _Route;
export const withRouter = _withRouter;
export const Link = _Link;
export const Switch = _Switch;

const PageCache = new Map();
let InternalInstanceIdCounter = 0;

export default class Page {
  static newInstance(name, options={}) {
    if (PageCache.has(name)) {
      throw new Error(`page<${name}> has been registered`);
    }

    const {
      path,
      component,
      props = {},
      i18n
    } = options;

    if (i18n != null) {
      Object.assign(props, {i18n});
    }

    const p = new Page(
      <WrappedComponent
        component={component}
        props={props}
        name={name}
        path={path}
      />
    );
    PageCache.set(name, p);
    return p;
  }

  static getComponent(name) {
    return PageCache.get(name).reactElement;
  }

  static getRootComponent() {
    return Page.getComponent('root')
  }

  constructor(c) {
    this.reactElement = c;
  }
}

class WrappedComponent extends React.Component {
  state = {};
  C = null;

  constructor(props) {
    super(props);

    this.name = props.name;
    this.__internal_instance_id = InternalInstanceIdCounter++;

    this.state = this.__init();
    this.C = this.props.component;
  }

  __init() {
    let {props} = this.props;

    for (let k in props) {
      let fn = props[k];
      if (typeof fn === 'function') {
        props[k] = fn.bind(this);
      }
    }

    return Object.assign({}, props);
  }

  render() {
    const C = ({ match, location, history }) =>
      <this.C
        match={match} location={location} history={history}
        {...this.state}
      />;
    return (
      <Route path={this.props.path} component={withRouter(C)}>
      </Route>
    );
  }
}
