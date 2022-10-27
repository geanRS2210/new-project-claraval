import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  background-color: white;
  height: 554px;
  overflow: auto;
  section {
    justify-content: center;
  }
  & .date {
    width: 140px;
    display: inline-block;
    margin: 5px 20px;
  }
  .number-local {
    width: 140px;
    margin: 20px auto;
    display: block;
  }
  .comments {
    width: 400px;
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
  & .telephone {
    width: 170px;
    display: inline-block;
    margin: 5px 20px;
  }
  & .name {
    width: 400px;
  }
  .local-pay {
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
  & .password-test {
    font-size: 25px;
    height: 50px;
    width: 340px;
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
  .radio {
    display: inline-block;
  }
  fieldset {
    border: none;
    width: 400px;
    margin: auto;
  }
  .form-auth {
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
  }
`;
