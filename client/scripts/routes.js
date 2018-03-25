import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Containers/Home';
import Dashboard from './Containers/Dashboard';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
