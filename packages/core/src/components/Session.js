import React from "react"

class Session extends React.Component {
  check() {
    if (this.props.skip) return true
    return true
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
