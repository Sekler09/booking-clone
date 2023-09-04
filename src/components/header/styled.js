import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import theme from 'styles/theme';

const StyledHeader = styled.header`
  padding: 12px 16px;
  background-color: ${theme.colors.oxfordBlue};
  color: ${theme.colors.white};
`;

const Nav = styled.nav`
  display: flex;
`;

const LogoLink = styled(Link)`
  font-family: Pangolin, serif;
  font-size: 36px;
`;

export { LogoLink, Nav, StyledHeader };
