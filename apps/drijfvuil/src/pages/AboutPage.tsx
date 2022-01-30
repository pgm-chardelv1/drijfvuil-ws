import React, { ReactElement } from 'react';

import * as Paths from '../routes';
import defaultStyles from '../config/styles';
import { AppArticle, AppBackButton, Footer, Main } from '../components';

function AboutPage(): ReactElement {
  return (
    <>
      <AppBackButton />

      <Main style={{ marginTop: '3rem' }}>
        <AppArticle
          title="Onze Missie"
          titleColor={defaultStyles.color.orange}
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna 

                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero "
        />

        <AppArticle
          title="Privacybeleid"
          titleColor={defaultStyles.color.highLight}
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.."
          uri={Paths.HOME}
        />

        <AppArticle
          title="Gebruiksvoorwaarden"
          titleColor={defaultStyles.color.primaryDark}
          text="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At verot."
          uri={Paths.HOME}
        />

        <AppArticle
          title="Disclaimer"
          titleColor={defaultStyles.color.orange}
          text="Wij zijn niet aansprakelijk voor ongevallen en dergelijke wanneer u vuilnis opruimt die u via deze app gevonden heeft."
        />
      </Main>

      <Footer />
    </>
  );
}

export default AboutPage;
