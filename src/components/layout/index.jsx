import { Outlet, useLocation } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';
import { MainWrapper } from 'styles/globalStyle';

import { BlueBg, Main } from './styled';

export default function Layout() {
  const location = useLocation();

  const isBlueBgNeeded =
    location.pathname === '/' || location.pathname === '/searchresults';

  return (
    <>
      <Header />
      {isBlueBgNeeded && <BlueBg />}
      <Main $isBlueBgNeeded={isBlueBgNeeded}>
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </Main>
      <Footer />
    </>
  );
}
