import * as React from 'react'

import { ENTER, ESC } from '@csb/common/lib/utils/keycodes'

import { InputContainer } from './elements'

function select(el) {
  if (el) el.select()
}

export default class EntryTitleInput extends React.PureComponent {
  handleChange = (e) => {
    if (e.target) {
      this.props.onChange(e.target.value)
      this.setState({ currentValue: e.target.value })
    }
  }
  handleKeyUp = (e) => {
    if (e.keyCode === ENTER) {
      this.props.onCommit(this.state.currentValue.trim())
    } else if (e.keyCode === ESC) {
      this.props.onCancel()
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      currentValue: props.title,
    }
  }

  render() {
    const { onCommit } = this.props
    const { currentValue } = this.state

    return (
      <InputContainer>
        <input
          onChange={this.handleChange}
          onBlur={() => onCommit(currentValue, true)}
          onKeyUp={this.handleKeyUp}
          ref={select}
          value={currentValue}
        />
      </InputContainer>
    )
  }
}
