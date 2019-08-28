import React from 'react'
import {Route} from '@doce/core'
import Login from './Login'
import Register from './Register'


const style = {
  margin: 'auto',
  minWidth: '300px',
}

export default class User extends React.Component {
  render() {
    const {routePath} = this.props

    console.log('user')

    return (
      <div style={style}>
        <Route path={routePath.login} render={() => <Login {...this.props}/>}/>
        <Route path={routePath.register} render={() => <Register {...this.props}/>}/>
      </div>
    )
  }
}
