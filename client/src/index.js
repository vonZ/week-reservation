import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { resolvers, typeDefs } from "./resolvers";
import injectStyles from "./styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Reservations from "./pages/reservations";

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    headers: {
      authorization: localStorage.getItem("token"),
      "client-name": "Week reservatation [web]",
      "client-version": "1.0.0"
    }
  }),
  resolvers,
  typeDefs
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem("token"),
    cartItems: []
  }
});

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Reservations />
  </ApolloProvider>,
  document.getElementById("root")
);
