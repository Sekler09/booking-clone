import { styled } from 'styled-components';
import theme from 'styles/theme';

const DayPickerWrapper = styled.div`
  position: absolute;
  top: 130%;
  left: 0;
  z-index: 5;
  border: 1px black solid;
  background-color: ${theme.colors.white};
`;

export { DayPickerWrapper };
