import styled from "styled-components";

export const Button = styled.button`
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

export const TextField = styled.input`
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
