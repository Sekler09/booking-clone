import { styled } from 'styled-components';
import theme from 'styles/theme';

const CounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CounterButton = styled.button`
  background-color: ${theme.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  height: 40px;
  width: 40px;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${theme.colors.lightBlueGray};
  }

  &:disabled:hover {
    background-color: ${theme.colors.white};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px ${theme.colors.oldSilver} solid;
  border-radius: 4px;
  overflow: hidden;
`;

const CountValue = styled.p`
  width: 32px;
  text-align: center;
`;

export { ButtonsWrapper, CounterButton, CounterWrapper, CountValue };
