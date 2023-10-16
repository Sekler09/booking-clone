import { Outlet, useLocation } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';
import { MainWrapper } from 'styles/globalStyle';

import { Main } from './styled';

export default function Layout() {
  const location = useLocation();

  const isExtraBgNeeded =
    location.pathname === '/' || location.pathname === '/searchresults';

  return (
    <>
      <Header isExtraBgNeeded={isExtraBgNeeded} />
      <Main $isExtraBgNeeded={isExtraBgNeeded}>
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </Main>
      <Footer />
    </>
  );
}
