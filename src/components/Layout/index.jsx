import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainWrapper } from 'styles/globalStyle';
import { Main } from './styled';

export default function Layout() {
  return (
    <>
      <Header />
      <Main>
        <MainWrapper>
          <Outlet />
        </MainWrapper>
      </Main>
      <Footer />
    </>
  );
}
