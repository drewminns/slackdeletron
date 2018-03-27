import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import './styles/main.scss';

import Main from './scripts/Main';
import reducers from './scripts/reducers';

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function configureStore(initialState) {
  const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./scripts/reducers', () => {
      const nextRootReducer = require('./scripts/reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

ReactDOM.render(
  <Provider store={configureStore({})}>
    <Main />
  </Provider>,
  document.getElementById('main')
);

if (module.hot) {
  module.hot.accept();
}
