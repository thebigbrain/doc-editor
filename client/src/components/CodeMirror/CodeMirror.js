import React from 'react'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'

import './CodeMirror.css'

const style = {
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto'
};

const defaultOption = {
  autofocus: true,
  cursorHeight: .85
}

export default class _ extends React.Component {
  ref = React.createRef();
  doc = null
  events = {}

  defaultValue = null

  registerEvents() {
    for (let evt in this.events) {
      this.doc.on(evt, this.events[evt])
    }
  }

  deregisterEvents() {
    for (let evt in this.events) {
      this.doc.off(evt)
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.doc.setValue(nextProps.value || '')
    for (let k in nextProps) {
      if (k !== 'value' && !k.startsWith('on')) {
        this.doc.setOption(k, nextProps[k])
      }
    }
    return false
  }

  componentDidMount() {
    const container = this.ref.current;
    this.doc = CodeMirror(
      container,
      Object.assign({}, defaultOption, this.props)
    );

    Object.keys(this.props).forEach(key => {
      if (key.startsWith('on')) {
        let k = key.substring(2).split('')
        k[0] = k[0].toLowerCase()
        if (typeof this.props[key] === 'function') {
          this.events[k.join('')] = this.props[key]
        }
      }

      this.registerEvents()
    })
  }

  componentWillUnmount() {
    this.deregisterEvents()
  }

  render() {
    return (<div style={style} ref={this.ref}/>);
  }
}
