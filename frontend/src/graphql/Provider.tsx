import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useState } from 'react';
import { useAppSelector } from '~/redux';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  credentials: 'include',
});

function GraphQLProvider({ children }: { children: React.ReactNode }) {
  const token = useAppSelector((state) => state.auth.accessToken);
  const [authApolloLink, setAuthApolloLink] = useState<ApolloLink>();

  useEffect(() => {
    (function () {
      const authLink = setContext((_, { headers }) => {
        const headerOptions = {
          ...headers,
          platform: 'app',
        };
        if (!token)
          return {
            headers: headerOptions,
          };
        return {
          headers: {
            ...headerOptions,
            authorization: token,
          },
        };
      });
      setAuthApolloLink(authLink);
    })();
  }, [token]);

  const client = new ApolloClient({
    link: authApolloLink?.concat(httpLink) || httpLink,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
