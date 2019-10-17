import React from 'react'
import Select from '../Select'

export default class PreferenceInput extends React.PureComponent {
  constructor() {
    super(...arguments)
    this.handleChange = (e) => {
      const {value} = e.target
      this.props.setValue(value)
    }
  }

  render() {
    const {value, options, mapName} = this.props
    return (<Select onChange={this.handleChange} value={value}>
      {options.map(op => (<option key={op} value={op}>
        {mapName ? mapName(op) : op}
      </option>))}
    </Select>)
  }
}
