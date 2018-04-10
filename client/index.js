import React from 'react';
import ReactDOM from 'react-dom';
import Main from './scripts/Main';
import keys from '../config/keys';
import Raven from 'raven-js';

import './styles/main.scss';
if (process.env.NODE_ENV === 'production') {
  Raven.config(keys.sentry).install();
}

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
