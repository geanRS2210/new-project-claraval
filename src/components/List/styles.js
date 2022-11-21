import styled from 'styled-components';

export const ListStyled = styled.ul`
  display: grid;
  grid-template-columns: 235px 180px 180px 30px 30px 30px 30px;
  gap: 20px;
  background-color: white;
  margin: 0px;
  a:visited {
    color: black;
  }
  a:active {
    color: black;
  }
  a {
    color: black;
  }
  &::after {
    content: '';
    display: block;
    position: relative;
    bottom: 20px;
    grid-column-start: 1;
    grid-column-end: 8;
    background-color: #4dff4d;
    height: 0.8px;
  }
`;
