import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './custom.scss'

import { Landing } from './Landing'
import { Venues } from './Venues'
import { Menu } from './Menu'
import { AuthProvider } from './contexts/AuthContext'
import Feed from './components/Feed'
import { MultiStepOnboard } from './components/MultiStepOnboard'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
   
    <React.Fragment>
      <Router>
      <AuthProvider>
          <Switch>
            <Route exact path="/" component={Landing} />
            <PrivateRoute path="/feed" component ={Feed} />
            <PrivateRoute path="/onboard" component = {MultiStepOnboard} />
            <Route path="/venues" component={Venues} />
            <Route path="/menu" component={Menu} />
          </Switch>
        </AuthProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
