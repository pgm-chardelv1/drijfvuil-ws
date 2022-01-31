import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { StrictMode } from 'react';
import { store } from './redux';

import App from './app/app';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AppGlobalStyle } from './components';
import client from './gql/db';
import { ApolloProvider } from '@apollo/client';

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppGlobalStyle />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// Add the ability to work offline and load faster
serviceWorkerRegistration.register();
