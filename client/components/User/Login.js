import React from 'react'
import { withStyles } from '@material-ui/styles'


class LoginType {
  static MOBILE = '2'
  static USER = '1'
}

const styles = theme => ({
  login: {
    width: 300,
    padding: 10,
    margin: 'auto',
  },
  submit: {
    width: '100%',
  },
  forget: {
    float: 'right',
  },
})


function NormalLoginForm(props) {
  return (
    <form>

    </form>
  )
}

export default withStyles(styles)(NormalLoginForm)
