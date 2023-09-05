import { styled } from 'styled-components';
import theme from 'styles/theme';

const CalendarInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px black solid;
  border-radius: 8px;
  width: 100%;
  gap: 10px;
  padding: 8px;
  background-color: ${theme.colors.white};
  position: relative;
`;

const CalendarImg = styled.img`
  width: 30px;
`;

const StyledCalendarInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 8px 6px;
  font-size: 16px;
  line-height: 20px;
`;

const DayPickerWrapper = styled.div`
  opacity: ${props => (props.$showCalendar ? 1 : 0)};
  position: absolute;
  z-index: 99;
  border: 1px black solid;
  top: calc(1em + 100%);
  left: 0;
  background-color: ${theme.colors.white};
`;

export {
  CalendarImg,
  CalendarInputWrapper,
  DayPickerWrapper,
  StyledCalendarInput,
};
