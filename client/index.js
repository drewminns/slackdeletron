import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import Main from './scripts/Main';

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
