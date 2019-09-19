import React from "react"
import {getToken} from "../session"

class Session extends React.Component {
  check() {
    if (this.props.skip) return true
    return getToken() != null
  }

  render() {
    if (!this.check()) return null

    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default Session
