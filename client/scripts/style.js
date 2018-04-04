import { injectGlobal } from 'styled-components';
// import 'normalize.css/normalize.css';

export const PRIMARY_FONT =
  '-apple-system, BlinkMacSystemFont, “Segoe UI”, “Roboto”, “Oxygen”, “Ubuntu”, “Cantarell”, “Fira Sans”, “Droid Sans”, “Helvetica Neue”,sans-serif';
export const BASE_PX = '18px';

export const BLACK = '#303030';
export const WHITE_DARK = '#F8F8FF';
export const WHITE = '#FFF';
export const BLUE = '#4800EA';
export const PINK = '#FB2067';
export const PURPLE = '#9013FE';

export const BOX_SHADOW = '0 5px 12px 0 rgba(0,0,0,0.10)';

export default injectGlobal`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: ${BASE_PX};
    background-color: ${WHITE_DARK};
    font-family: ${PRIMARY_FONT};
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  h1, h2, h3 {
    font-weight: 700;
  }
`;
