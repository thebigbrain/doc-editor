import React from 'react';
import { combineReducers, createStore } from 'redux';
import {
  Route as _Route,
  Link as _Link,
  withRouter as _withRouter,
  Switch as _Switch,
  BrowserRouter,
} from "react-router-dom";
import {getCurrentSession} from './session';

export const Route = _Route;
export const withRouter = _withRouter;
export const Link = _Link;
export const Switch = _Switch;


export default class Page {
  static routes = [];
  static store = null;
  static reducers = {};
  static updater = {};

  static newInstance(options) {
    let {path, component, exact = false, props = {}, i18n} = options;

    const comp = (routeOptions) => (
      <WrappedComponent
        __internal_page_component={component}
        options={options}
        routeOptions={routeOptions}
        state={Object.assign(props, {i18n})}
      />
    );

    exact = exact === true || path === '/';
    const key = `__page_route_${path}`;
    this.routes.push(<Route key={key} exact={exact} path={path} component={comp}/>);

    const reducerKey = Page.convertReducerKey(options.path);
    Page.reducers[reducerKey] = (state = null, action={}) => {
      if (action.type === reducerKey) {
        if (typeof this.updater[reducerKey] === 'function') {
          this.updater[reducerKey](action.payload);
        }
        return Object.assign({}, state, action.payload);
      }
      return state;
    };

    return new Page(options);
  }

  static getRouter() {
    const reducer = combineReducers(this.reducers);
    this.store = createStore(reducer);

    return (
      <BrowserRouter>
        <Route path='/' component={withRouter(Session)}/>
        {this.routes}
      </BrowserRouter>
    );
  }

  static convertReducerKey(path) {
    return String(path).replace('/', '_');
  }

  constructor(option) {
    this.option = option;
  }

  setState(state) {
    Page.store.dispatch({
      type: Page.convertReducerKey(this.option.path),
      payload: state
    });
  }
}

class WrappedComponent extends React.Component {
  state = {};
  C = null;

  constructor(props) {
    super(props);
    this.C = props.__internal_page_component;

    this.routeOptions = props.routeOptions;
    this.state = props.state;
    const options = props.options;

    Page.updater[Page.convertReducerKey(options.path)] = this.setState.bind(this);
  }

  render() {
    return (
      <this.C {...this.routeOptions} {...this.state}/>
    );
  }
}

class Session extends React.Component {
  constructor(props) {
    super(props);

    const {history} = props;

    getCurrentSession().then(() => {
      history.replace('/app');
    }).catch(() => {
      history.replace('/user/login');
    });
  }

  render() {
    console.log('render session');
    return null;
  }
}
