import { styled } from 'styled-components';
import theme from 'styles/theme';

const DayPickerWrapper = styled.div`
  position: absolute;
  border: 1px black solid;
  top: 130%;
  left: 0;
  background-color: ${theme.colors.white};
`;

export { DayPickerWrapper };
