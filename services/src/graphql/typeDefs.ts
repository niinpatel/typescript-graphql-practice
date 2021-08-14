import { gql } from "apollo-server";

const typeDefs = gql`
  type Chef {
    id: ID!
    name: String!
    restaurants: [Restaurant!]!
  }

  type Restaurant {
    id: ID!
    name: String!
  }

  type Mutation {
    createChef(name: String!): Chef!
    createRestaurent(name: String!, chefId: String!): Restaurant!
  }

  type Query {
    chefs: [Chef!]!
  }
`;

export default typeDefs;
