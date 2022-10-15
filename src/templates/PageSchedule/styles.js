import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  background-color: white;
  height: 554px;
  overflow-y: scroll;
  & input {
    height: 3px;
    width: 400px;
    font-size: 15px;
    color: white;
    &::placeholder {
      color: white;
    }
  }
  & button {
    margin: 5px 20px;
    height: 35px;
    border: none;
    border-radius: 10px;
    &:hover {
      transition-duration: 0.35s;
      background-color: red;
      color: white;
      border-radius: 20px;
    }
  }
  & .date {
    width: 140px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .telephone {
    width: 170px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .name {
    width: 400px;
  }
  & .doctor {
    width: 440px;
    height: 46px;
    border-radius: 15px;
    font-size: 16px;
    margin-bottom: 15px;
    color: white;
    background-color: grey;
    padding-left: 15px;
  }
  & .password-test {
    width: 440px;
    height: 46px;
    border-radius: 15px;
    font-size: 16px;
    margin-bottom: 15px;
    color: white;
    background-color: grey;
    padding-left: 15px;
  }
  li {
    list-style: none;
    display: inline-block;
    padding: 5px;
    margin: 10px;
  }
  .type-schedule {
    height: 30px;
    width: 200px;
    margin: 20px;
  }
  .add-operator {
    border: none;
    &:hover {
      transition-duration: 0.5s;
      border: none;
      background-color: #18a713;
      color: white;
    }
  }
  .delete-button {
    cursor: pointer;
  }
`;
