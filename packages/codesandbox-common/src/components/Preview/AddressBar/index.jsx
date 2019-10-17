import React from 'react'
import {ENTER} from '../../../utils/keycodes'
import {Container, InputContainer} from './elements'

export default class extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.onChange = (evt) => {
      const {onChange} = this.props
      onChange(evt.target.value)
    }
    this.handleKeyDown = (e) => {
      const {onConfirm} = this.props
      if (e.keyCode === ENTER) {
        onConfirm()
      }
    }
    this.focus = () => {
      if (this.input) {
        this.input.focus()
      }
    }
  }

  render() {
    const {url = ''} = this.props
    return (<Container onClick={this.focus}>
      <InputContainer>
        <input ref={e => {
          this.input = e
        }} onChange={this.onChange} onKeyDown={this.handleKeyDown} value={url} aria-label="Address Bar Input"/>
      </InputContainer>
    </Container>)
  }
}
