import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Viewport from './components/layout/Viewport';
import * as serviceWorker from './serviceWorker';
import Firebase from './tools/Firebase'
import { FirebaseContext } from './constants/contexts'
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <FirebaseContext.Provider value={new Firebase()}>
      <Viewport />
    </FirebaseContext.Provider>
  </Router>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
