import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const StyledHeader = styled.header`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.oxfordBlue};
  color: ${({ theme }) => theme.colors.white};
`;

const Nav = styled.nav`
  display: flex;
`;

const LogoLink = styled(Link)`
  font-family: Pangolin, serif;
  font-size: 36px;
`;

export { LogoLink, Nav, StyledHeader };
