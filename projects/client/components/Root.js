import React from 'react'
import { Provider as OvermindProvider } from 'overmind-react'
import { createOvermind } from 'overmind'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { Redirect, Route, Router, Switch } from '@muggle/core/router'
import history from '@muggle/core/history'
import overmindConfig from '@muggle/client/overmind'
// import config from 'client/config/global'
import routes from '@muggle/client/config/routes'
import themeConfig from '@muggle/client/config/theme'
// import 'client/pages'

const theme = createMuiTheme(themeConfig)

export const overmind = createOvermind(overmindConfig, {
  devtools: false
})
/**
 * @return {null}
 */
export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <OvermindProvider value={overmind}>
        <Router history={history}>
          <App/>
        </Router>
      </OvermindProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <Switch>
      {
        routes.map(({path, exact, component, redirect}) =>
          (
            redirect == null
              ? <Route key={path} path={path || ''} exact={exact || false} component={component}/>
              : <Redirect key='redirect' to={redirect}/>
          )
        )
      }
    </Switch>
  )
}
