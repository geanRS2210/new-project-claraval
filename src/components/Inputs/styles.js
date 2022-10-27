import styled from 'styled-components';

export const InputStyled = styled.input`
  font-size: 25px;
  padding: 20px;
  height: 10px;
  width: 300px;
  border-radius: 15px;
  background-color: white;
  display: block;
  margin: 15px auto;
  color: black;
  border: 1px solid #4dff4d;
  outline: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:focus {
    border: none;
    border-bottom: 2px groove #4dff4d;
  }
`;
