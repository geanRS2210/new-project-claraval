import styled from 'styled-components';

export const Container = styled.form`
  background: blue;
  font-size: 16px;
  justify-content: center;
  text-align: center;

  & > input {
    font-size: 25px;
    padding: 20px;
    height: 40px;
    border-radius: 15px;
    background-color: red;
    &:hover {
      background-color: white;
    }
  }
`;
