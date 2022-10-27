import styled from 'styled-components';

export const ListStyled = styled.ul`
  background-color: white;
  margin: 0px;
  &::after {
    content: '';
    display: block;
    width: 100%;
    background-color: #4dff4d;
    height: 0.8px;
  }
`;
