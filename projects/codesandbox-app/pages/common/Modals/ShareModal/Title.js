import React, { Component } from 'react'
import {Down, Right} from '@muggle/icons'
import { animated, Spring } from 'react-spring/renderprops'
import { Title } from './elements'

export default class extends Component {
  state = { open: this.props.open || false }

  toggleShow = () => this.setState(({ open }) => ({ open: !open }))

  render() {
    const { children, title } = this.props
    const { open } = this.state
    return (
      <>
        <Title onClick={() => this.toggleShow()}>
          {open ? <Down/> : <Right/>}
          {title}
        </Title>
        <Spring
          from={{ height: 'auto' }}
          to={{
            height: open ? 'auto' : 0,
            overflow: 'hidden',
          }}
        >
          {props => <animated.div style={props}>{children}</animated.div>}
        </Spring>
      </>
    )
  }
}
