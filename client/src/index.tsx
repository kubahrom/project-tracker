import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import ApolloProviderWrapper from './ApolloProvider';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProviderWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);
