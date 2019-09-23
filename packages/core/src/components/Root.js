import React from 'react'
import {Route, Router, Switch} from "react-router"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from '@material-ui/core/styles'

import history from '../router'
import Landing from './Landing'
import AuthDialog from './AuthDialog'
import {reAuth} from "../session"
import config from '../config'

const theme = createMuiTheme()

export default function Root(props) {
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let aborted = false

    reAuth().then(() => {
      if (aborted) return
      setLoading(false)
      console.log('reAuth success')
    }).catch((e) => {
      if (aborted) return
      // setLoading(false)
      console.error(e)
      // toLogin()
      setOpen(true)
    })

    return () => {
      aborted = true
    }
  }, [])

  function onClose() {
    setLoading(false)
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Landing landing={loading}>
        <Router history={history}>
          <Switch>
            {props.children}
            <Route component={config.NotFound}/>
          </Switch>
        </Router>
      </Landing>
      <AuthDialog defaultValue='login' open={open} onClose={onClose}/>
    </ThemeProvider>
  )
}
