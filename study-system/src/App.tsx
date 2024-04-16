import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.scss";
import LayoutItem from "./layouts";

const graphQLServerUrl = "https://36c-devapi.ambitions.pro/graphql";

const httpLink = createHttpLink({
  uri: graphQLServerUrl,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const myClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={myClient}>
      <LayoutItem />
    </ApolloProvider>
  );
}

export default App;
