import { styled, css } from 'styled-components';

const bigHeader = css`
  margin-top: 0;
  transform: translateY(-35px);

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    transform: translateY(-80px);
  }
`;
const Main = styled.main`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  margin-top: 40px;
  padding: 0 10px;
  transform: translateY(0);

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    transform: translateY(0);
  }

  ${({ $isBigHeader }) => $isBigHeader && bigHeader}
`;

export { Main };
