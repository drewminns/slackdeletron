import { injectGlobal } from 'styled-components';
import 'normalize.css/normalize.css';

export const PRIMARY_FONT =
  '-apple-system, BlinkMacSystemFont, “Segoe UI”, “Roboto”, “Oxygen”, “Ubuntu”, “Cantarell”, “Fira Sans”, “Droid Sans”, “Helvetica Neue”,sans-serif';
export const BASE_PX = '15px';

export const BLACK = '#010101';
export const BLACK_LIGHT = '#2f2f2f';
export const BLUE = '#2000ff';
export const RED = '#fb2067';
export const LIGHT_GREY = '#f7f7f7';
export const WHITE = '#FFF';

export default injectGlobal`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: ${BASE_PX};
    background-color: ghostwhite;
    font-family: ${PRIMARY_FONT};
  }

  h1, h2, h3 {
    font-weight: 700;
  }
`;
