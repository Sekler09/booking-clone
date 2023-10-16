import styled from 'styled-components';

import { ReactComponent as Tick } from 'assets/tick.svg';

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const CheckboxField = styled.div`
  border: 1px ${({ theme }) => theme.textColor} solid;
  border-radius: 4px;
  margin-right: 5px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.appBg};
`;

const CheckboxInput = styled.input`
  display: none;

  &:checked ~ ${CheckboxField} {
    background-color: ${({ theme }) => theme.colors.trueBlue};
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
`;

const CheckboxLabelText = styled.p`
  font-size: 16px;
`;

const CheckboxLabelCount = styled.p`
  margin-left: auto;
  font-size: 14px;
`;

const TickIcon = styled(Tick)`
  fill: ${({ theme }) => theme.colors.white};
`;

export {
  FilterContainer,
  CheckboxInput,
  CheckboxLabel,
  CheckboxLabelText,
  CheckboxLabelCount,
  CheckboxField,
  TickIcon,
};
