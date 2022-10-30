import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0, 0, 0);
  height: 65px;
  .links {
    text-decoration: none;
    color: white;
    padding: 8px;
    font-size: 20px;
    &:hover {
      &::after {
        transition-duration: 0.2s;
        content: '';
        display: block;
        margin: 7px auto;
        width: 61px;
        background-color: white;
        height: 2px;
      }
    }
    &::after {
      content: '';
      display: block;
      margin: 7px auto;
      width: 18px;
      background-color: white;
      height: 2px;
      z-index: 7;
    }
  }
  .login-logedin {
    color: white;
    width: 35px;
    position: relative;
    top: 2px;
    &:hover {
      transition-duration: 0.4s;
      color: #23e61b;
    }
  }
  .login-logedout {
    color: white;
    width: 35px;
    position: relative;
    top: 2px;
    &:hover {
      transition-duration: 0.4s;
      color: red;
    }
  }
`;
