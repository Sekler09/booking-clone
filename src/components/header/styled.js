import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

const bigHeader = css`
  padding-bottom: 62px;

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding-bottom: 92px;
  }
`;

const StyledHeader = styled.header`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.mode.headerBg};
  color: ${({ theme }) => theme.colors.white};

  ${({ $isBigHeader }) => $isBigHeader && bigHeader}
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

const SiteOptionsContainer = styled.div`
  display: flex;
`;

export {
  LogoLink,
  Nav,
  StyledHeader,
  HeaderInnerContainer,
  SiteOptionsContainer,
};
