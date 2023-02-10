import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './pages/index.css';
import App from './components/app/app';
import { rootReducer } from './services/reducers/index';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enchancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enchancer);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);