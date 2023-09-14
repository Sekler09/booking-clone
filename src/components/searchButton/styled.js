import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import theme from 'styles/theme';

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

  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.white};
  }
`;
export { Button };
