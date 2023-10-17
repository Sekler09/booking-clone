import { useSearchParams } from 'react-router-dom';
import { bool } from 'prop-types';

import { MainWrapper } from 'styles/globalStyle';

import LanguageSwitcher from 'components/languageSwitcher';
import ThemeSwitcher from 'components/themeSwitcher';

import {
  LogoLink,
  Nav,
  StyledHeader,
  HeaderInnerContainer,
  SiteOptionsContainer,
} from './styled';

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
          <SiteOptionsContainer>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </SiteOptionsContainer>
        </HeaderInnerContainer>
      </MainWrapper>
    </StyledHeader>
  );
}

Header.propTypes = {
  isBigHeader: bool.isRequired,
};
