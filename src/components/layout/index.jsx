import { Outlet } from 'react-router-dom';

import Footer from 'components/footer';
import Header from 'components/header';

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
