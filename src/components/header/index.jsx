import { useSearchParams } from 'react-router-dom';

import { MainWrapper } from 'styles/globalStyle';

import { LogoLink, Nav, StyledHeader } from './styled';

export default function Footer() {
  const [searchParams] = useSearchParams();
  const toUrl = `/?${searchParams.toString()}`;
  return (
    <StyledHeader>
      <MainWrapper>
        <Nav>
          <LogoLink to={toUrl}>RoomBook</LogoLink>
        </Nav>
      </MainWrapper>
    </StyledHeader>
  );
}
