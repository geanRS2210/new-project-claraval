import styled from 'styled-components';

export const Container = styled.div`
  background: blue;
  font-size: 16px;
  justify-content: center;
  text-align: center;

  & > h1 {
    font-size: 25px;
    padding: 20px;
  }
`;
