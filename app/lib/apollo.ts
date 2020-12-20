import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {
  // Create an authentication link
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from localstorage if it exists
    // sessionStorage vs. localStorage
    const token = sessionStorage.getItem('token');
    // return the headers to the context so HttpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'include',
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

// Initialize apollo client with context
export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // initial apollo client state gets re-hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // for SSR or SSG always create a new Apollo Client
  if (typeof window === undefined) return _apolloClient;
  // create the apollo client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
