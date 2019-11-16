import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';

import {useOvermind} from '@muggle/hooks';

export default function(props) {
  const {state, actions} = useOvermind();
  let {width = '100%', height = '100%'} = props;
  const container = useRef(null);
  let editor = state.monacoEditor;

  useEffect(() => {
    if (!container) return null;

    let editor = monaco.editor.create(container.current);
    actions.editor.setMonaco(editor);
  }, [container]);

  if (editor) {
    editor.layout({width, height});
  }

  return (
    <div style={{width:'100%', height: '100%'}} ref={container}></div>
  );
}