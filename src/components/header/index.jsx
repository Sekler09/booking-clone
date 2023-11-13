import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { bool } from 'prop-types';
import { useSelector } from 'react-redux';

import { MainWrapper } from 'styles/globalStyle';

import LanguageSwitcher from 'components/languageSwitcher';
import ThemeSwitcher from 'components/themeSwitcher';
import authApi from 'api/auth';

import {
  LogoLink,
  Nav,
  StyledHeader,
  HeaderInnerContainer,
  SiteOptionsContainer,
} from './styled';

export default function Header({ isBigHeader }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const location = useLocation();

  function onLogout() {
    authApi.logout().then(() => {
      navigate(0);
    });
  }

  const isAuthPage =
    location.pathname === '/signup' || location.pathname === '/signin';

  const toUrl = `/?${searchParams.toString()}`;

  return (
    <StyledHeader $isBigHeader={isBigHeader}>
      <MainWrapper>
        <HeaderInnerContainer>
          <Nav>
            <LogoLink to={toUrl}>RoomBook</LogoLink>
          </Nav>
          <p>{user?.email}</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SiteOptionsContainer>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </SiteOptionsContainer>
            {user ? (
              <NavLink type="button" onClick={() => onLogout()}>
                Log out
              </NavLink>
            ) : (
              !isAuthPage && <NavLink to="/signin">Sign In</NavLink>
            )}
          </div>
        </HeaderInnerContainer>
      </MainWrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  isBigHeader: bool.isRequired,
};
