import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import theme, { device } from 'styles/theme';

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  background-color: ${theme.colors.trueBlue};
  color: ${theme.colors.white};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.pantone};
  }

  @media ${device.laptop} {
    padding: 8px;
    width: 100%;
    font-size: 18px;
  }
`;
export { Button };
