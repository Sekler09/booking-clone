import { useSearchParams } from 'react-router-dom';
import { bool } from 'prop-types';

import { MainWrapper } from 'styles/globalStyle';

import ThemeSwitcher from 'components/themeSwitcher';
import { LogoLink, Nav, StyledHeader, HeaderInnerContainer } from './styled';

export default function Header({ isExtraBgNeeded }) {
  const [searchParams] = useSearchParams();

  const toUrl = `/?${searchParams.toString()}`;

  return (
    <StyledHeader $isExtraBgNeeded={isExtraBgNeeded}>
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
  isExtraBgNeeded: bool.isRequired,
};
