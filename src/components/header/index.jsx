import { MainWrapper } from '../../styles/globalStyle';
import { LogoLink, Nav, StyledHeader } from './styled';

export default function Footer() {
  return (
    <StyledHeader>
      <MainWrapper>
        <Nav>
          <LogoLink to="/">RoomBook</LogoLink>
        </Nav>
      </MainWrapper>
    </StyledHeader>
  );
}
