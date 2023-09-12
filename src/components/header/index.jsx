import { useSearchParams } from 'react-router-dom';

import { MainWrapper } from 'styles/globalStyle';
import { LogoLink, Nav, StyledHeader } from './styled';

export default function Footer() {
  const [searchParams] = useSearchParams();

  return (
    <StyledHeader>
      <MainWrapper>
        <Nav>
          <LogoLink to={`/?${searchParams.toString()}`}>RoomBook</LogoLink>
        </Nav>
      </MainWrapper>
    </StyledHeader>
  );
}
