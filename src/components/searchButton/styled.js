import { styled } from 'styled-components';
import theme from 'styles/theme';

const Button = styled.button`
  border-radius: 8px;
  color: ${theme.colors.white};
  font-size: 24px;
  background-color: ${theme.colors.trueBlue};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;

  &:hover {
    background-color: ${theme.colors.pantone};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${theme.colors.white};
  }
`;
export { Button };
