import { MainWrapper } from 'styles/globalStyle';
import { Copyright, StyledFooter } from './styled';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <MainWrapper>
        <Copyright>&copy;Lipnitski Artsemi, iTechArt {year}</Copyright>
      </MainWrapper>
    </StyledFooter>
  );
}
