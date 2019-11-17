import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';

import {useOvermind} from '@muggle/hooks';

export default function(props) {
  const {state, actions} = useOvermind();

  const { monacoEditor, currentModule, } = state.editor;

  let {width = '100%', height = '100%'} = props;
  const container = useRef(null);

  useEffect(() => {
    if (!container) return null;

    let e = monaco.editor.create(container.current);
    actions.editor.setMonaco(e);
  }, [container]);

  if (monacoEditor) {
    monacoEditor.layout({width, height});
    
    if (currentModule) {
      monacoEditor.setValue(currentModule.code);
    }

    console.log(currentModule);
  }

  return (
    <div style={{width:'100%', height: '100%'}} ref={container}></div>
  );
}