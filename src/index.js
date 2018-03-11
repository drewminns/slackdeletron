import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';

import sum from './scripts/utils/sum';

class Main extends Component {
  render() {
    const hello = sum();
    return <Fragment>Hello</Fragment>;
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
