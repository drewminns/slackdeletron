import React from 'react';
import ReactDOM from 'react-dom';
import Main from './scripts/Main';
const keys = require('../config/keys');

import './styles/main.scss';

if (process.env.NODE_ENV === 'production') {
  Raven.config(keys.sentry).install();
}

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
