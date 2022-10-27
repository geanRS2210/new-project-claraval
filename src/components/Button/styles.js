import styled from 'styled-components';

export const ButtonStyled = styled.button`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100px;
  height: 30px;
  border-radius: 15px;
  margin: 5px 20px;
  height: 35px;
  border: none;
  border-radius: 10px;

  &:hover {
    transition-duration: 0.35s;
    background-color: rgba(0, 99, 0, 0.3);
    color: black;
    border-radius: 20px;
  }
`;
