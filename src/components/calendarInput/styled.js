import { styled } from 'styled-components';
import theme from 'styles/theme';

const DayPickerWrapper = styled.div`
  position: absolute;
  z-index: 99;
  border: 1px black solid;
  top: calc(1em + 100%);
  left: 0;
  background-color: ${theme.colors.white};
`;

export { DayPickerWrapper };
