import React from 'react'
import {Router} from "react-router"
import {ThemeProvider} from "@material-ui/styles"
import {createMuiTheme} from '@material-ui/core/styles'
import {createBrowserHistory} from "history"

import {getCurrentSession} from "../session"

const history = createBrowserHistory()

export default class Root extends React.Component {
  static theme = createMuiTheme()
  static Landing = null
  state = {
    landing: true
  }

  static withLanding(Landing) {
    this.Landing = ({landing, children}) => {
      return landing ? <Landing/> : <React.Fragment>{children}</React.Fragment>
    }
  }

  componentDidMount() {
    getCurrentSession().then(() => {
      this.setState({landing: false})
    }).catch((err) => {
      console.error(err)
    }).finally(() => {
      this.setState({landing: false})
    })
  }

  render() {
    return (
      <ThemeProvider theme={Root.theme}>
        <Root.Landing landing={this.state.landing}>
          <Router history={history}>
            {this.props.children}
          </Router>
        </Root.Landing>
      </ThemeProvider>
    )
  }
}
