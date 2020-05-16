import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from 'serviceWorker';
import { App } from 'components/app';
import { apolloClient } from 'apolloClient';
import { ToastProvider } from 'react-toast-notifications';

const history = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={history} >
      <ToastProvider
        placement='bottom-left'
      >
        <App />
      </ToastProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
