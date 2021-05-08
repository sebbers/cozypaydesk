import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createStore, applyMiddleware, compose }from 'redux';
import { Provider }from 'react-redux'
import rootReducers from './redux/_reducers'
import thunk from 'redux-thunk'
import { AuthProvider } from './contexts/JWTContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { HelmetProvider } from 'react-helmet-async';
import store from './store';

const middlewares = [thunk]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(rootReducers,  composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
          <SettingsProvider>
            <BrowserRouter>
              <AuthProvider>
                <App />
              </AuthProvider>
            </BrowserRouter>
          </SettingsProvider>
      </Provider> 
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);