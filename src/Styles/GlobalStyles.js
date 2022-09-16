import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0px;
  padding: 0px;
  font-size: 16px;
}
body {
  min-height: 100%;
}

.principal {
  min-height: 380px;
  max-height: 600px;
  box-sizing: border-box;
}
.secondary {
  background-color: gray;
  min-height: 80%;
  max-height: 100%;
  box-sizing: border-box;
}
`;
