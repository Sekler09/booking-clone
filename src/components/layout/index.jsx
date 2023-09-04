import { Outlet } from 'react-router-dom';

import Header from 'components/header';
import Footer from 'components/footer';
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
