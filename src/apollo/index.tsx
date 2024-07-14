import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${import.meta.env.VITE_GH_TOKEN}`,
  },
  cache: new InMemoryCache(),
});

interface Props {
  children: React.ReactNode;
}

export default function ApolloWrapper({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
