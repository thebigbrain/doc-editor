import React from 'react'
import FullScreenDialog from '../../../client/components/FullScreenDialog'
import Switch from '../../../client/components/Switch'
import Case from '../../../client/components/Case'
import SignIn from './SignIn'
import Forgot from './Forgot'
import Register from './Register'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function (props) {
  function handleChange(v) {
    console.log(v)
  }

  return (
    <FullScreenDialog open={props.open} onClose={props.onClose}>
      <Switch value={props.defaultValue} onChange={handleChange} onDone={props.onClose}>
        <Case name='login'><SignIn/></Case>
        <Case name='forgot'><Forgot/></Case>
        <Case name='register'><Register/></Case>
      </Switch>
    </FullScreenDialog>
  )
}
