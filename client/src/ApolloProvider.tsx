import React from 'react';
import {
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
} from '@apollo/client';
import App from './App';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://192.168.0.111:5001',
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken-project-tracker');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getProjects: {
            merge(_, incoming) {
              return incoming;
            },
          },
          getIssues: {
            merge(_, incoming) {
              return incoming;
            },
          },
          getIssue: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Issue: {
        fields: {
          comments: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
      Project: {
        fields: {
          shared: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

const ApolloProviderWrapper = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default ApolloProviderWrapper;
