import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html, body {
margin: 0;
padding: 0;
height: 100%;
}
#root{
min-height: 100%;
position: relative;
}
div.principal{
  /** Altura do rodapé tem que ser igual a isso aqui e vice-versa **/
padding-bottom: 100px;
height: 100%;
}
footer{
background: blue;
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
`;
