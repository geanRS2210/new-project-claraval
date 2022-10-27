import styled from 'styled-components';

export const HeaderStyled = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(0, 0, 0);
  height: 50px;
  .links {
    text-decoration: none;
    color: white;
    padding: 8px;
    font-size: 20px;
    &:hover {
      transition-duration: 0.3s;
      background-color: rgba(0, 99, 0, 0.3);
      border-radius: 8px;
    }
  }
  .login-logedout {
    color: white;
    width: 35px;
    position: relative;
    top: 2px;
    &:hover {
      transition-duration: 0.4s;
      color: #23e61b;
    }
  }
`;
