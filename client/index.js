import React from 'react';
import ReactDOM from 'react-dom';
import Main from './scripts/Main';
import './scripts/style';

ReactDOM.render(<Main />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}
