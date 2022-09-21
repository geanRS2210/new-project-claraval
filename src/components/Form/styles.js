import styled from 'styled-components';

export const FormStyled = styled.form`
  background: blue;
  font-size: 16px;
  justify-content: center;
  text-align: center;
  margin: auto 20px;
  padding: 20px;
  height: 100%;

  & > input {
    margin: 15px auto;
  }
`;
