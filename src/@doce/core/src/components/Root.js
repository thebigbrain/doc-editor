import React from 'react'
import {Redirect, Router} from "react-router"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from '@material-ui/core/styles'

import {getCurrentSession} from "../session"
import history from '../router'

export default class Root extends React.Component {
  static theme = createMuiTheme()
  static Landing = null

  state = {
    landing: true
  }

  unmounted = false

  static withLanding(Landing) {
    this.Landing = ({landing, children}) => {
      return landing ? <Landing/> : children
    }
  }

  componentDidMount() {
    getCurrentSession().then(() => {
      if (this.unmounted) return
      this.setState({landing: false})
    }).catch((err) => {
      console.error(err)
      history.push('/user/login')
    }).finally(() => {
      this.setState({landing: false})
    })
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    return (
      <ThemeProvider theme={Root.theme}>
        <Root.Landing landing={this.state.landing}>
          <Router history={history}>
            {this.props.children}
            <Redirect exact from='/' to='/app'/>
          </Router>
        </Root.Landing>
      </ThemeProvider>
    )
  }
}
