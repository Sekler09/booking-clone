import { useSearchParams } from 'react-router-dom';
import { bool } from 'prop-types';

import { MainWrapper } from 'styles/globalStyle';

import ThemeSwitcher from 'components/themeSwitcher';
import { LogoLink, Nav, StyledHeader, HeaderInnerContainer } from './styled';

export default function Header({ isBigHeader }) {
  const [searchParams] = useSearchParams();

  const toUrl = `/?${searchParams.toString()}`;

  return (
    <StyledHeader $isBigHeader={isBigHeader}>
      <MainWrapper>
        <HeaderInnerContainer>
          <Nav>
            <LogoLink to={toUrl}>RoomBook</LogoLink>
          </Nav>
          <ThemeSwitcher />
        </HeaderInnerContainer>
      </MainWrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  isBigHeader: bool.isRequired,
};
