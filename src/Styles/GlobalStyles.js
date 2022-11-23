import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
:root {
  --toastify-color-error: #e74c3c;
}
html, body {
margin: 0;
padding: 0;
height: 100%;
font-family: sans-serif;
}
* {
  font-family: sans-serif;
}
body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background-color: red;
  color: white;
}
.Toastify__progress-bar--error {
  background-color: white;
}
.Toastify__toast--success {
  background-color: green;
  color: white;
}
.Toastify__progress-bar--success {
  background-color: white;
}

#root{
min-height: 100%;
position: relative;
}
div.principal{
  /** Altura do rodapé tem que ser igual a isso aqui e vice-versa **/
padding-bottom: 100px;
height: 470px;
}
footer{
background: 	rgb(0, 0, 0);
width: 100%;
height: 30px;
position: absolute;
bottom: 0;
left: 0;
}
.toastify {
  width: 300px;
  height: 40px;
}
.popover {
  position: relative;
}
.comment-popover {
  display: none;
  position: absolute;
  padding: 15px;
  border-radius: 15px;
  transition-duration: 0.8s;
}
.popover:hover {
  & .comment-popover {
    display: block;
    min-height: 72px;
    resize: none;
    background-color: #4dff4ddd;
    color: black;
    box-shadow: 3px 3px 15px black;
    top: -100px;
    left: -185px;
  }
}
`;
