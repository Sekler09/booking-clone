import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { bool } from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
          {user && <NavLink to="/profile">{user.email}</NavLink>}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SiteOptionsContainer>
              <LanguageSwitcher />
              <ThemeSwitcher />
            </SiteOptionsContainer>
            {user ? (
              <NavLink type="button" onClick={() => onLogout()}>
                {t('logout')}
              </NavLink>
            ) : (
              !isAuthPage && (
                <NavLink
                  to="/signin"
                  state={{ prev: location.pathname + location.search }}
                >
                  {t('signin')}
                </NavLink>
              )
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
