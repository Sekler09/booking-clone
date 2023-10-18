import { styled } from 'styled-components';

import { ReactComponent as Plus } from 'assets/plus.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';

const CounterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-transform: capitalize;
`;

const CounterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  height: 40px;
  width: 40px;
  background-color: ${({ theme }) => theme.mode.appBg};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlueGray};
  }

  &:disabled:hover {
    background-color: ${({ theme }) => theme.mode.appBg};
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px ${({ theme }) => theme.colors.oldSilver} solid;
  border-radius: 4px;
  overflow: hidden;
`;

const CountValue = styled.p`
  width: 32px;
  text-align: center;
`;

const StyledPlus = styled(Plus)`
  path {
    stroke: ${({ theme, $active }) =>
      $active ? theme.colors.trueBlue : theme.colors.oldSilver};
  }
`;

const StyledMinus = styled(Minus)`
  path {
    stroke: ${({ theme, $active }) =>
      $active ? theme.colors.trueBlue : theme.colors.oldSilver};
  }
`;

export {
  ButtonsWrapper,
  CounterButton,
  CounterWrapper,
  CountValue,
  StyledPlus,
  StyledMinus,
};
