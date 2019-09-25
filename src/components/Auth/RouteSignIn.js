import React from 'react'
import SignIn from './SignIn'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import config from '../../config'
import history from '@doce/core/router'


export default function (props) {
  function handleSubmit() {
    history.goBack()
  }

  return (
    <SignIn onSubmit={handleSubmit}>
      <Grid item xs>
        <Link to={config.routePath.forgot}>
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link to={config.routePath.register}>
          Don't have an account? Sign Up
        </Link>
      </Grid>
    </SignIn>
  )
}
