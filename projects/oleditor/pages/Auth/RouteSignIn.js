import React from 'react'
import Grid from '@material-ui/core/Grid'
import { history, Link } from '@muggle/core'

import SignIn from './SignIn'
import index from '../../../client/config/global'


export default function(props) {
  function handleSubmit() {
    history.back()
  }

  return (
    <SignIn onSubmit={handleSubmit}>
      <Grid item xs>
        <Link to={index.routePath.forgot}>
          Forgot password?
        </Link>
      </Grid>
      <Grid item>
        <Link to={index.routePath.register}>
          Don't have an account? Sign Up
        </Link>
      </Grid>
    </SignIn>
  )
}
