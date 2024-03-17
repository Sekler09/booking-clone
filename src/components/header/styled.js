import { Link } from 'react-router-dom';
import { css, styled } from 'styled-components';

const bigHeader = css`
  padding-bottom: 62px;

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
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

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    font-size: 24px;
  }
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${({ theme }) => `(max-width: ${theme.sizes[1]})`} {
    flex-direction: column;
    gap: 20px;
  }

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    gap: 10px;
  }
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
