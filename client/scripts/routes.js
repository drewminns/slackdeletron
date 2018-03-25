import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Components/Home';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class Routes extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/ok" component={About} />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
