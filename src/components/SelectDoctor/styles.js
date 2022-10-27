import styled from 'styled-components';

export const DoctorStyled = styled.select`
  font-size: 25px;
  height: 50px;
  width: 340px;
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
