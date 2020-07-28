import firebase from './firebase'
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './custom.scss';

import { FirstInput } from './FirstInput';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Venues } from './Venues';
import { Navigation } from './components/Navigation';
import { Menu } from './Menu';
function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
        <Route exact path="/" component={FirstInput} />
        <Route path="/venues" component={Venues} />
        <Route path="/menu" component={Menu} />
        <Route path="/signup" component={SignUp} />
        </Switch>
        </Router>

    </React.Fragment>
  );
}

export default App;
