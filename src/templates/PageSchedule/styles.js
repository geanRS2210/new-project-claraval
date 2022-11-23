import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  background-color: white;
  height: 550px;
  overflow: auto;
  .form-add {
    & input {
      height: 35px;
      padding: 0px;
      padding-left: 15px;
      width: 550px;
      font-size: 16px;
      margin: 10px;
    }
    .date {
      width: 160px;
      display: inline-block;
    }
    .telephone {
      width: 300px;
      display: inline-block;
    }
    .doctor {
      margin-left: 11px;
      width: 565px;
      height: 35px;
      font-size: 16px;
    }
    .comments {
      width: 545px;
      font-size: 16px;
      height: 200px;
      text-align: start;
      background-color: white;
      border-radius: 15px;
      border: 1px solid #4dff4d;
      margin: 10px;
      padding: 10px;
      &:hover {
        transition-duration: 0.35s;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .local-pay {
      width: 75px;
      padding-left: 10px;
      font-size: 16px;
      height: 40px;
      border-radius: 15px;
      background-color: white;
      display: inline-block;
      border: 1px solid #4dff4d;
      margin: 15px;
      color: black;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &:focus {
        border: none;
        border-bottom: 2px groove #4dff4d;
      }
    }
    .password-test {
      width: 565px;
      padding: 0px;
      padding-left: 10px;
      height: 35px;
      font-size: 16px;
      border-radius: 15px;
      background-color: white;
      display: block;
      margin: 15px auto;
      color: black;
      border: 1px solid #4dff4d;
      outline: none;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      &:focus {
        border: none;
        border-bottom: 2px groove #4dff4d;
      }
    }
  }
  .number-local {
    width: 140px;
    margin: 20px auto;
    display: block;
  }
  & .telephone {
    width: 170px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .name {
    width: 400px;
  }
  .search {
    height: 30px;
    width: 400px;
    padding: 0px;
    font-size: 14px;
    padding-left: 15px;
    margin-bottom: 30px;
    background-image: url('images/search.png');
    background-position: 360px 3px;
    background-repeat: no-repeat;
    border: 1px solid gray;
  }
  li {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
  .type-schedule {
    display: inline-block;
    height: 30px;
    width: 200px;
    margin: 20px;
    margin-right: 0px;
    border-radius: 15px;
    padding-left: 10px;
  }
  .type-specialty {
    display: inline-block;
    width: 200px;
    height: 30px;
    margin: 20px;
    margin-right: 0px;
    padding-left: 10px;
    border: 1px solid gray;
    font-size: 12px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    &:focus {
      border: none;
      border-bottom: 2px groove #4dff4d;
    }
  }
  .delete-button {
    cursor: pointer;
  }
  .radio {
    display: inline-block;
  }
  fieldset {
    border: none;
    width: 400px;
    margin: auto;
  }
  h1 {
    display: block;
    margin: 17px;
    padding: 15px;
  }
  .form-auth {
    border-radius: 15px;
    animation: 2s cubic-bezier(0, 0, 0, 0) infinite alternate-reverse forwards
      login;
    img {
      display: inline-block;
      margin-right: 15px;
    }
    .section-auth {
      display: inline-block;
      position: relative;
      bottom: 20px;
      h1 {
        margin: 2px;
      }
      h4 {
        margin: 2px;
      }
    }
    .user-auth {
      background-image: url('images/male.png');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      padding-left: 50px;
    }
    .password-auth {
      background-image: url('images/key.png');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      padding-left: 50px;
    }
  }
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    & > h1 {
      animation-duration: 1.3s;
      animation-name: carregando;
      animation-iteration-count: infinite;
    }
    @keyframes login {
      from {
        box-shadow: 1px 1px 41px gray;
      }
      2.5% {
        box-shadow: 1px 1px 40px gray;
      }
      5% {
        box-shadow: 1px 1px 39px gray;
      }
      7.5% {
        box-shadow: 1px 1px 38px gray;
      }
      10% {
        box-shadow: 1px 1px 37px gray;
      }
      12.5% {
        box-shadow: 1px 1px 36px gray;
      }
      15% {
        box-shadow: 1px 1px 35px gray;
      }
      17.5% {
        box-shadow: 1px 1px 34px gray;
      }
      20% {
        box-shadow: 1px 1px 33px gray;
      }
      22.5% {
        box-shadow: 1px 1px 32px gray;
      }
      25% {
        box-shadow: 1px 1px 31px gray;
      }
      27.5% {
        box-shadow: 1px 1px 30px gray;
      }
      30% {
        box-shadow: 1px 1px 29px gray;
      }
      32.5% {
        box-shadow: 1px 1px 28px gray;
      }
      35% {
        box-shadow: 1px 1px 27px gray;
      }
      37.5% {
        box-shadow: 1px 1px 26px gray;
      }
      40% {
        box-shadow: 1px 1px 25px gray;
      }
      42.5% {
        box-shadow: 1px 1px 24px gray;
      }
      45% {
        box-shadow: 1px 1px 23px gray;
      }
      47.5% {
        box-shadow: 1px 1px 22px gray;
      }
      50% {
        box-shadow: 1px 1px 21px gray;
      }
      52.5% {
        box-shadow: 1px 1px 20px gray;
      }
      55% {
        box-shadow: 1px 1px 19px gray;
      }
      57.5% {
        box-shadow: 1px 1px 18px gray;
      }
      60% {
        box-shadow: 1px 1px 17px gray;
      }
      62.5% {
        box-shadow: 1px 1px 16px gray;
      }
      65% {
        box-shadow: 1px 1px 15px gray;
      }
      67.5% {
        box-shadow: 1px 1px 14px gray;
      }
      70% {
        box-shadow: 1px 1px 13px gray;
      }
      72.5% {
        box-shadow: 1px 1px 12px gray;
      }
      75% {
        box-shadow: 1px 1px 11px gray;
      }
      77.5% {
        box-shadow: 1px 1px 10px gray;
      }
      80% {
        box-shadow: 1px 1px 09px gray;
      }
      82.5% {
        box-shadow: 1px 1px 08px gray;
      }
      85% {
        box-shadow: 1px 1px 07px gray;
      }
      87.5% {
        box-shadow: 1px 1px 06px gray;
      }
      to {
        box-shadow: 1px 1px 05px gray;
      }
    }
    @keyframes carregando {
      from {
        font-size: 17px;
      }
      10% {
        font-size: 18px;
      }
      20% {
        font-size: 19px;
      }
      30% {
        font-size: 20px;
      }
      40% {
        font-size: 21px;
      }
      50% {
        font-size: 22px;
      }
      60% {
        font-size: 21px;
      }
      70% {
        font-size: 20px;
      }
      80% {
        font-size: 19px;
      }
      90% {
        font-size: 18px;
      }
      to {
        font-size: 17px;
      }
    }
  }
`;
