import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';

import './CodeMirror.css';

const style = {
  width: '100%',
  height: '100%',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'auto'
};

export default class _ extends React.Component {
  ref = React.createRef();
  _codeMirror = null;

  componentDidMount() {
    const container = this.ref.current;
    this._codeMirror = CodeMirror(
      // function(elt) {
      //   container.parentNode.replaceChild(elt, container);
      // },
      container,
      this.props
    );
  }

  render() {
    return (<div style={style} ref={this.ref}/>);
  }
}
