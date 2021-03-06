import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';
import isDev from '../utils/isDev';

let apolloClient = null;

const isBrowser = process.browser;

const devEndpoint = process.env.GRAPH_QL_DEV;
const prodEndpoint = process.env.GRAPH_QL_PROD;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  const httpLink = new HttpLink({
    uri: isDev() ? devEndpoint : prodEndpoint,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
