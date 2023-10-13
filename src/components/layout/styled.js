import { styled, css } from 'styled-components';

const blueBgNeededStyles = css`
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

  ${({ $isBlueBgNeeded }) => $isBlueBgNeeded && blueBgNeededStyles}
`;

const BlueBg = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.oxfordBlue};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    height: 80px;
  }
`;

export { Main, BlueBg };
