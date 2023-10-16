import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

const extraBgNeededStyles = css`
  padding-bottom: 62px;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding-bottom: 92px;
  }
`;

const StyledHeader = styled.header`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.mode.headerBg};
  color: ${({ theme }) => theme.colors.white};

  ${({ $isExtraBgNeeded }) => $isExtraBgNeeded && extraBgNeededStyles}
`;

const Nav = styled.nav`
  display: flex;
`;

const LogoLink = styled(Link)`
  font-family: Pangolin, serif;
  font-size: 36px;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export { LogoLink, Nav, StyledHeader, HeaderInnerContainer };
