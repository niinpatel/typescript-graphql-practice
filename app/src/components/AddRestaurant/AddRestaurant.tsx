import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button, TextField } from "../Common";

const Wrapper = styled.div``;

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
      <Button onClick={() => setIsAdding(true)}>+</Button>
    </Wrapper>
  );
};
