import React from 'react'
import {Route, Router, Switch} from "react-router"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from '@material-ui/core/styles'
import history from '../../packages/core/src/router'
import config from '../config'
import RouteSignIn from "./Auth/RouteSignIn"
import RouteSignUp from "./Auth/RouteSignUp"

const theme = createMuiTheme()

/**
 * @return {null}
 */
export default function Root(props) {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route path={config.routePath.login} component={RouteSignIn}/>
          <Route path={config.routePath.register} component={RouteSignUp}/>
          {props.children}
          <Route component={config.NotFound}/>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
