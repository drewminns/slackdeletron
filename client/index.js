import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import Routes from './scripts/routes';

class Main extends Component {
  render() {
    return <Routes />;
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
