import { styled } from 'styled-components';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pantone};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;
export { Button };
