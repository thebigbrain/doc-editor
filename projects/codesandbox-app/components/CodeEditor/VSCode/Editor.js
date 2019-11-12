import React, {useRef, useEffect} from 'react';
import * as monaco from 'monaco-editor';

export default function(props) {
  const container = useRef(null);
  let editor = null;

  useEffect(() => {
    if (!container) return null;

    editor = monaco.editor.create(container.current);
  }, [container]);

  return (
    <div style={{width:'100%', height: '100%'}} ref={container}></div>
  );
}