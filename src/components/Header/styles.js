import styled from 'styled-components';

export const HeaderStyled = styled.header`
  background-color: blue;
  text-align: center;
  padding: 8px;
  & > a {
    margin: 0px 15px 0px 15px;
    display: inline-block;
    height: 35px;
    width: 125px;
    text-decoration: none;
    & > button {
      height: 30px;
      width: 120px;
      border: none;
      border-radius: 10px;
    }
    & > button:hover {
      transition-duration: 0.4s;
      color: white;
      background-color: #23e61b;
      border-radius: 15px;
    }
  }
  .add {
    background-color: #18a713;
    width: 35px;
  }
  .add-link {
    width: 60px;
  }
`;
