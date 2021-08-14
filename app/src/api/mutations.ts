import { gql } from "@apollo/client";

export const createRestaurantMutation = gql`
  mutation ($chefId: ID!, $name: String!) {
    createRestaurant(chefId: $chefId, name: $name) {
      id
      name
    }
  }
`;

export const createChefMutation = gql`
  mutation ($name: String!) {
    createChef(name: $name) {
      id
      name
      restaurants {
        id
        name
      }
    }
  }
`;
