import React from 'react';
import {
  addDays,
  addYears,
  endOfYear,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { func, instanceOf, shape } from 'prop-types';

import { StyledDayPicker } from './styled';

function DateRangePicker({ selectedDays, onNewRange }) {
  const today = startOfToday();
  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];
  return (
    <StyledDayPicker
      mode="range"
      fromMonth={today}
      toMonth={endOfYear(addYears(today, 1))}
      defaultMonth={today}
      numberOfMonths={2}
      disabled={disabledDays}
      weekStartsOn={1}
      selected={selectedDays}
      onSelect={newRange => onNewRange(newRange)}
      fixedWeeks
    />
  );
}

DateRangePicker.propTypes = {
  selectedDays: shape({
    from: instanceOf(Date),
    to: instanceOf(Date),
  }).isRequired,
  onNewRange: func.isRequired,
};

export default DateRangePicker;
