import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App.js';
import reducers from './reducers/index.js';
import './index.css';

// create main root storage to store the application state
const store = createStore(reducers, compose(applyMiddleware(thunk)));

// connect to div of Id of root
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);