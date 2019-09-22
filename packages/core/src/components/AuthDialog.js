import React from 'react'
import FullScreenDialog from './FullScreenDialog'
import Switch from "./Switch"
import Case from './Case'
import SignIn from "./SignIn"
import Forgot from './Forgot'
import Register from './Register'

export default function (props) {
  const {value, setValue} = React.useState(props.defaultValue)

  function handleChange(v) {
    setValue(v)
  }

  return (
    <FullScreenDialog open={props.open} onClose={props.onClose}>
      <Switch value={value} onChange={handleChange}>
        <Case name='login'><SignIn/></Case>
        <Case name='forgot'><Forgot/></Case>
        <Case name='register'><Register/></Case>
      </Switch>
    </FullScreenDialog>
  )
}
