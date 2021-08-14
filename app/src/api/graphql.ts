import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: process.env.SERVICES_URI + "/graphql" }),
});

export default client;
