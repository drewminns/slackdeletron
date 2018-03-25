import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

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
          <Route path="/" component={Home} />
          <Route path="/ok" component={About} />
        </Fragment>
      </Router>
    );
  }
}

export default Routes;
