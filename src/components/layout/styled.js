import { styled } from 'styled-components';

const Main = styled.main`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  padding: 0 10px;
  transform: translateY(-35px);

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    transform: translateY(-80px);
  }
`;

const BlueBg = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.oxfordBlue};

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    height: 80px;
  }
`;

export { Main, BlueBg };
