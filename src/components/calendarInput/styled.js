import { styled } from 'styled-components';

const DayPickerWrapper = styled.div`
  position: absolute;
  top: 130%;
  left: 0;
  border: 1px black solid;
  background-color: ${({ theme }) => {
    return theme.colors.white;
  }};
`;

export { DayPickerWrapper };
