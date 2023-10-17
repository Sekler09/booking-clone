import { DayPicker } from 'react-day-picker';
import styled from 'styled-components';

const StyledDayPicker = styled(DayPicker)`
  color: ${({ theme }) => theme.mode.textColor};

  /* stylelint-disable selector-class-pattern, selector-not-notation */
  .rdp-nav_button {
    width: 30px;
    height: 30px;
  }

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: ${({ theme }) => theme.mode.calendarHover};
  }
  /* stylelint-enable selector-class-pattern, selector-not-notation */
`;

export { StyledDayPicker };
