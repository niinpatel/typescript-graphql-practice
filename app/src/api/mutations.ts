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

export const deleteChefMutation = gql`
  mutation ($id: ID!) {
    deleteChef(id: $id)
  }
`;

export const deleteRestaurantMutation = gql`
  mutation ($id: ID!) {
    deleteRestaurant(id: $id)
  }
`;
