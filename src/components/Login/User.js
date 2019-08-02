import React from 'react';
import {Route}  from 'base/page';
import Login from './Login';
import Register from './Register';


const style = {
  margin: 'auto',
  width: '500px',
};

export default class User extends React.Component {
  render() {
    const {routePath} = this.props;

    return (
      <div style={style}>
        <Route path={routePath.login} render={() => <Login {...this.props}/>}/>
        <Route path={routePath.register} render={() => <Register {...this.props}/>}/>
      </div>
    );
  }
}
