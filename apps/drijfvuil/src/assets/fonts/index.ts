import { createGlobalStyle } from 'styled-components';

import bebasNueRegularWoff from './BebasNeue-Regular.woff';
import bebasNueRegularWoff2 from './BebasNeue-Regular.woff2';
import firaSansWoff from './FiraSans-SemiBold.woff';
import firaSansWoff2 from './FiraSans-SemiBold.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'Bebas Neue';
        src: url(${bebasNueRegularWoff2}) format('woff2'),
            url(${bebasNueRegularWoff}) format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Fira Sans';
        src: url(${firaSansWoff2}) format('woff2'),
            url(${firaSansWoff}) format('woff');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
    }
`;
