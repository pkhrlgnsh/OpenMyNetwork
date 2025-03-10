import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://openmynetwork.com/graphql',
  cache: new InMemoryCache()
});

export default client;
