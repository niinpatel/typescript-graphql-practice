import "@babel/polyfill";
import * as React from "react";
import { render } from "react-dom";
import Root from "./components/Root";

import { ApolloProvider } from "@apollo/react-hooks";

import graphqlClient from "./api/graphql";

render(
  <ApolloProvider client={graphqlClient}>
    <Root />
  </ApolloProvider>,

  document.getElementById("app")
);
