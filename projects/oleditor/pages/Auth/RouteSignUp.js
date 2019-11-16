import React from 'react'
import Register from './Register'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import index from '../../../client/config/global'
import history from 'packages/core/history'

export default function(props) {
  function handleSubmit() {
    history.replace(index.routePath.login)
  }

  return (
    <Register onSubmit={handleSubmit}>
      <Grid item>
        <Link to={index.routePath.login}>
          Already have an account? Sign in
        </Link>
      </Grid>
    </Register>
  )
}
