import { styled } from 'styled-components';

const Main = styled.main`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  margin-top: ${({ $isBlueBgNeeded }) => ($isBlueBgNeeded ? 0 : '40px')};
  padding: 0 10px;
  transform: ${({ $isBlueBgNeeded }) =>
    $isBlueBgNeeded ? 'translateY(-35px)' : 0};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    transform: ${({ $isBlueBgNeeded }) =>
      $isBlueBgNeeded ? 'translateY(-80px)' : 0};
  }
`;

const BlueBg = styled.div`
  height: ${({ $isBlueBgNeeded }) => ($isBlueBgNeeded ? '50px' : 0)};
  background-color: ${({ theme }) => theme.colors.oxfordBlue};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    height: ${({ $isBlueBgNeeded }) => ($isBlueBgNeeded ? '80px' : 0)};
  }
`;

export { Main, BlueBg };
