import React from 'react';
import {Redirect, Route} from '@doce';
import './App.css';

// import CodeMirror from 'components/CodeMirror/CodeMirror';
import UserList from '../User/UserList';
import Game from 'components/Game/Game';

function App() {
  return (
    <div className="App">
      {/*<CodeMirror*/}
      {/*mode={{name: "jsx", json: true}}*/}
      {/*lineNumbers={true}*/}
      {/*styleActiveLine={true}*/}
      {/*matchBrackets={true}*/}
      {/*/>*/}
      <Redirect to='/app/games'/>
      <Route path='/app/users' component={UserList}/>
      <Route path='/app/games' component={Game}/>
    </div>
  );
}

export default App;
