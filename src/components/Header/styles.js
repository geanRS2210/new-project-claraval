import styled from 'styled-components';

export const HeaderStyled = styled.header`
  background-color: blue;
  text-align: center;
  padding: 8px;
  & > a {
    margin: 5px 15px 5px 15px;
    color: white;
    display: inline-block;
    height: 25px;
    width: 125px;

    &:hover {
      transition-duration: 0.3s;
      background-color: grey;
      border-radius: 15px;
    }
  }
`;
