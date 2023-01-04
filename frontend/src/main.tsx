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

const HTTP_ROOT =
  process.env.NODE_ENV === "production"
    ? "https://ntuniverse-production.up.railway.app/graphql"
    : "http://localhost:4001/graphql";

const WS_ROOT =
  process.env.NODE_ENV === "production"
  //? "ws://localhost:4001/subscriptions"
    ?`wss://ntuniverse-production.up.railway.app/subscriptions`
    : "ws://localhost:4001/subscriptions";

const httpLink = new HttpLink({
  uri: HTTP_ROOT
});
const wsLink = new GraphQLWsLink(createClient({
  url: WS_ROOT
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
  //<React.StrictMode>
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId="400363191853-gjef8qplkajcu781n791f6eonffkcfq3.apps.googleusercontent.com">

        <MyProvider>
          <App />
        </MyProvider>

      </GoogleOAuthProvider>
    </ApolloProvider>
  //</React.StrictMode>,
)


