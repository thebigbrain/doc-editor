import React from 'react'
import Tooltip from '../../components/Tooltip'
import PreferenceSwitch from './PreferenceSwitch'
import PreferenceDropdown from './PreferenceDropdown'
import PreferenceNumber from './PreferenceNumber'
import PreferenceText from './PreferenceText'
import PreferenceKeybinding from './PreferenceKeybinding'
import {Container} from './elements'

export default class Preference extends React.Component {
  constructor() {
    super(...arguments)
    this.getOptionComponent = () => {
      const {props} = this
      if (props.type === 'boolean') {
        return (<PreferenceSwitch {...props} setValue={props.setValue} value={props.value}/>)
      }
      if (props.type === 'string') {
        return (<PreferenceText {...props} setValue={props.setValue} value={props.value}/>)
      }
      if (props.type === 'dropdown') {
        return (<PreferenceDropdown {...props} options={props.options} setValue={props.setValue} value={props.value}/>)
      }
      if (props.type === 'keybinding') {
        return (<PreferenceKeybinding {...props} setValue={props.setValue} value={props.value}/>)
      }
      return (<PreferenceNumber {...props} setValue={props.setValue} value={props.value}/>)
    }
  }

  render() {
    const {title, style, className, tooltip} = this.props
    const Title = tooltip ? (<Tooltip placement="right" content={tooltip}>
      {title}
    </Tooltip>) : (<span>{title}</span>)
    return (<Container style={style} className={className}>
      {Title}
      <div>{this.getOptionComponent()}</div>
    </Container>)
  }
}
