import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Main } from './styled';
import { MainWrapper } from '../../styles/globalStyle';

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
