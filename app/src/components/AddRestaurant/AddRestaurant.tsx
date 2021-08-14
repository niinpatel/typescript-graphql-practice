import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div``;

const AddRestaurantButton = styled.button`
  border: 0.0625rem dashed #aaaaaa;
  color: #555555;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  padding: 0.25em;

  :hover {
    cursor: pointer!;
  }
`;

const TextField = styled.input`
  border: 0;
  border-bottom: 0.124rem solid #cccccc;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 300;
  padding: 0.25em;

  :focus {
    border-bottom-color: #aaaaaa;
    outline: none;
  }
`;

interface AddRestaurantProps {
  onAddRestaurant(values: { name: string }): Promise<void> | void;
}

export default ({ onAddRestaurant: pushAddRestaurant }: AddRestaurantProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = handleSubmit(async (values: { name: string }) => {
    await pushAddRestaurant(values);
    reset();
    setIsAdding(false);
  });

  if (isAdding) {
    return (
      <form onSubmit={onSubmit}>
        <TextField
          type="text"
          disabled={isSubmitting}
          {...register("name", { required: true })}
        />

        <button disabled={!isValid || isSubmitting} type="submit">
          add
        </button>
      </form>
    );
  }
  return (
    <Wrapper>
      <AddRestaurantButton onClick={() => setIsAdding(true)}>
        +
      </AddRestaurantButton>
    </Wrapper>
  );
};
