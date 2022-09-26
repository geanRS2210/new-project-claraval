import styled from 'styled-components';

export const Wrapper = styled.div`
  text-align: center;
  background-color: gray;
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
    width: 150px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .telephone {
    width: 200px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .name {
    width: 400px;
    display: inline-block;
    margin-right: 20px;
  }
`;
