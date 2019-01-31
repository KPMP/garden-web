import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap-css-only/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// this is the link to connect to the graphql server
const httpLink = createHttpLink({
	  uri: 'http://localhost:8080/graphql'
	});
	
// ApolloClient communicates with the graphql server and has an in memory cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
		  <ApolloProvider client={client}>
		    <App />
		  </ApolloProvider>,
		  document.getElementById('root')
		);
