import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './custom.scss';

import { Landing } from './Landing';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Venues } from './Venues';
import { Navigation } from './components/Navigation';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/venues" component={Venues} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        </Switch>
        </Router>
        
    </React.Fragment>
  );
}

export default App;
