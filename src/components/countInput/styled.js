import { styled } from 'styled-components';
import theme from 'styles/theme';

const CountersWrapper = styled.div`
  position: absolute;
  z-index: 99;
  border: 1px black solid;
  top: calc(1em + 100%);
  right: 0;
  background-color: ${theme.colors.white};
  width: 120%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DoneButton = styled.button`
  width: 100%;
  padding: 4px 12px;
  margin-top: 20px;
  display: flex;
  color: ${theme.colors.trueBlue};
  background-color: ${theme.colors.white};
  border-radius: 4px;
  border: 1px ${theme.colors.trueBlue} solid;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.lightBlueGray};
  }

  cursor: pointer;
  line-height: 20px;
  font-size: 14px;
`;

export { CountersWrapper, DoneButton };
