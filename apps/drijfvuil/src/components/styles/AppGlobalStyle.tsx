import { createGlobalStyle } from 'styled-components';

import defaultStyles from '../../config/styles';

const AppGlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'); */
/* @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Sans:wght@600&display=swap'); */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  word-break: break-word;
}

body {
  width: 99.9vw;
  height: 99.9vh;
  overflow: hidden;
  background-color: ${defaultStyles.color.grey};
  color: ${defaultStyles.color.white};
  font-family: ${defaultStyles.font.family.bebas};
  font-size: ${defaultStyles.font.size.xs};
}

a {
  color: ${defaultStyles.color.white}
}
`;
export default AppGlobalStyle;
