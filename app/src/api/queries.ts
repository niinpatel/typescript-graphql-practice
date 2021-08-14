import { gql } from "@apollo/client";

export const getChefsQuery = gql`
  query {
    chefs {
      id
      name
      restaurants {
        id
        name
      }
    }
  }
`;
