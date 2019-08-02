import React from 'react';
import './App.css';

import CodeMirror from 'components/CodeMirror/CodeMirror';

function App() {
  return (
    <div className="App">
      <CodeMirror
        mode={{name: "jsx", json: true}}
        lineNumbers={true}
        styleActiveLine={true}
        matchBrackets={true}
      />
    </div>
  );
}

export default App;
