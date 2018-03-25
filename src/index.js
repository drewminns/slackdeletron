import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './styles/main.scss';

import sum from './scripts/utils/sum';

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

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={Home} />
          <Route path="/ok" component={About} />
        </div>
      </Router>
    );
    // const hello = sum();
    // return <Fragment>Hello</Fragment>;
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
