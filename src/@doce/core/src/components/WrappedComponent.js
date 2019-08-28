import React from "react"
import {withTheme} from "@material-ui/styles"


class WrappedComponent extends React.Component {
  state = {}
  C = null

  constructor(props) {
    super(props)
    this.C = props.__internal_page_component

    this.routeProps = props.routeProps
    this.state = props.state
    this.page = props.page
    this.callbacks = props.callbacks
    const options = props.options

    props.setUpdater((state) => this.setState(state))
  }

  render() {
    return (
      <this.C
        {...this.routeProps}
        {...this.state}
        {...this.callbacks}
        page={this.page}
        theme={this.props.theme}
      >
        {this.props.children}
      </this.C>
    )
  }
}

export default withTheme(WrappedComponent)
