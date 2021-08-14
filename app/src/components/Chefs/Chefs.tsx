import * as React from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import AddRestaurant from "../AddRestaurant";

interface Restaurant {
  id: string;
  name: string;
}

interface Chef {
  id: string;
  name: string;
  restaurants: Restaurant[];
}

interface QueryData {
  chefs: Chef[];
}

const query = gql`
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

const Chef = styled.div`
  margin-bottom: 1rem;
`;

const ChefName = styled.strong`
  font-size: 1.5rem;
`;

const Restaurant = styled.span`
  background-color: #eeeeee;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25em;
  margin: 0.25rem 0.5rem 0.25rem 0;
`;

const Restaurants = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 0.5rem;
`;

const Wrapper = styled.div``;

const createRestaurantMutation = gql`
  mutation ($chefId: ID!, $name: String!) {
    createRestaurant(chefId: $chefId, name: $name) {
      id
      name
    }
  }
`;

export default () => {
  const { data, loading, refetch } = useQuery<QueryData>(query);

  const [createRestaurant] = useMutation<
    {
      createRestaurant: Restaurant;
    },
    {
      chefId: string;
      name: string;
    }
  >(createRestaurantMutation);

  if (loading) {
    return <p>loading</p>;
  }

  const { chefs } = data!;

  const onAddRestaurant = async (values: { name: string }, id: string) => {
    await createRestaurant({
      variables: { ...values, chefId: id },
    });
    await refetch();
  };

  return (
    <Wrapper>
      {chefs.map(({ id, name, restaurants }) => {
        return (
          <Chef key={id}>
            <ChefName>{name}</ChefName>
            <Restaurants>
              {restaurants.map(({ id, name }) => {
                return <Restaurant key={id}>{name}</Restaurant>;
              })}

              <AddRestaurant
                onAddRestaurant={(values) => onAddRestaurant(values, id)}
              />
            </Restaurants>
          </Chef>
        );
      })}
    </Wrapper>
  );
};
