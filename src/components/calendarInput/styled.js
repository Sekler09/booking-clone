import { styled } from 'styled-components';

const DayPickerWrapper = styled.div`
  position: absolute;
  top: 130%;
  left: 0;
  z-index: 5;
  border: 1px black solid;
  background-color: ${({ theme }) => theme.colors.white};
`;

export { DayPickerWrapper };
