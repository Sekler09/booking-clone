import { styled } from 'styled-components';

const MainNoBlueBgNeededStyles = {
  marginTop: '40px',
  transform: 'translateY(0)',
};

const Main = styled.main`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  margin-top: 0;
  padding: 0 10px;
  transform: translateY(-35px);

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    transform: translateY(-80px);
    ${({ $isBlueBgNeeded }) => !$isBlueBgNeeded && MainNoBlueBgNeededStyles}
  }

  ${({ $isBlueBgNeeded }) => !$isBlueBgNeeded && MainNoBlueBgNeededStyles}
`;

const BlueBg = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.oxfordBlue};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    height: 80px;
  }
`;

export { Main, BlueBg };
