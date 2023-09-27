import { styled } from 'styled-components';
import { device } from 'styles/theme';

const Main = styled.main`
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 40px;
  padding: 0 10px;
  transform: translateY(-35px);

  @media ${device.laptop} {
    transform: translateY(-80px);
  }
`;

const BlueBg = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.colors.oxfordBlue};

  @media ${device.laptop} {
    height: 80px;
  }
`;

export { Main, BlueBg };
