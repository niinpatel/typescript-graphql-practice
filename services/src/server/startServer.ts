import accessEnv from "#root/helpers/accessEnv";
import * as express from "express";
import * as cors from "cors";
import { ApolloServer } from "apollo-server-express";

import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/typeDefs";

const PORT = Number(accessEnv("PORT", "7000"));

const apolloServer = new ApolloServer({ resolvers, typeDefs });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
