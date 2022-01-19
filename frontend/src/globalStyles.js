import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #393939;
    font-family: Roboto, Open-Sans, Helvetica, Sans-Serif;
  }
  
`;
 
export default GlobalStyle;