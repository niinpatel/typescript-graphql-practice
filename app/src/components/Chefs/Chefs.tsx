import * as React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";
import AddRestaurant from "../AddRestaurant";
import { Button, TextField } from "../Common";
import { useForm } from "react-hook-form";
import { getChefsQuery } from "../../api/queries";
import {
  createChefMutation,
  createRestaurantMutation,
  deleteChefMutation,
  deleteRestaurantMutation,
} from "../../api/mutations";

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

export default () => {
  const { data, loading, refetch } = useQuery<QueryData>(getChefsQuery);

  const {
    formState: { isValid, isSubmitting },
    register,
    reset,
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const [createRestaurant] = useMutation<
    { createRestaurant: Restaurant },
    { chefId: string; name: string }
  >(createRestaurantMutation);

  const [createChef] = useMutation<{ createChef: Chef }, { name: string }>(
    createChefMutation
  );

  const [deleteChef] = useMutation<{ deleteChef: Boolean }, { id: string }>(
    deleteChefMutation
  );

  const [deleteRestaurant] = useMutation<
    { deleteRestaurant: Boolean },
    { id: string }
  >(deleteRestaurantMutation);

  const onAddChef = handleSubmit(async (values: { name: string }) => {
    await createChef({ variables: values });
    await refetch();
    reset();
  });

  const onAddRestaurant = async (values: { name: string }, id: string) => {
    await createRestaurant({ variables: { ...values, chefId: id } });
    await refetch();
  };

  if (loading) {
    return <p>loading...</p>;
  }

  const { chefs } = data!;

  return (
    <Wrapper>
      {chefs.map(({ id, name, restaurants }) => (
        <Chef key={id}>
          <ChefName>
            {name}{" "}
            <Button
              onClick={async () => {
                await deleteChef({ variables: { id } });
                await refetch();
              }}
            >
              x
            </Button>
          </ChefName>
          <Restaurants>
            {restaurants.map(({ id, name }) => (
              <Restaurant key={id}>
                {name}{" "}
                <Button
                  onClick={async () => {
                    await deleteRestaurant({ variables: { id } });
                    await refetch();
                  }}
                >
                  x
                </Button>
              </Restaurant>
            ))}

            <AddRestaurant
              onAddRestaurant={(values) => onAddRestaurant(values, id)}
            />
          </Restaurants>
        </Chef>
      ))}

      <form onSubmit={onAddChef}>
        <TextField
          {...register("name", { required: true })}
          placeholder="Chef's name"
          disabled={isSubmitting}
        />
        <button type="submit" disabled={!isValid || isSubmitting}>
          add chef
        </button>
      </form>
    </Wrapper>
  );
};
