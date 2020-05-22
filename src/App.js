// Packages
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import About from './components/About/About';

// CSS
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || '/'}>
      <Switch>
        <Route
          path='/about'
          exact
          render={(props) => <About {...props} title='About' />}
        />
        <Route
          path='/chat'
          render={(props) => <Chat {...props} title='Chat' />}
        />
        <Route
          path='/'
          exact
          render={(props) => <Join {...props} title='Join' />}
        />
      </Switch>
    </Router>
  );
}

export default App;
