import { PublicApi } from '@react-three/cannon'
import React from 'react'
  import ReactDOM from 'react-dom/client'
import dotenv from 'dotenv-defaults';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import App from './App'
import './index.css'

// MyContext -> useMyContext
import { MyProvider } from './Utils/useMyContext'

import { GoogleOAuthProvider } from '@react-oauth/google';

const httpLink = new HttpLink({
  uri: 'http://localhost:4001/graphql'
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4001/subscriptions'
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId="400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com">

        <MyProvider>
          <App />
        </MyProvider>

      </GoogleOAuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
)


