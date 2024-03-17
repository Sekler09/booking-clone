import React from 'react';
import {
  addDays,
  addYears,
  endOfYear,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { func, instanceOf, shape } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { StyledDayPicker } from './styled';

function DateRangePicker({ selectedDays, onNewRange }) {
  const { i18n } = useTranslation();

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
      numberOfMonths={window.innerWidth > 768 ? 2 : 1}
      disabled={disabledDays}
      weekStartsOn={1}
      selected={selectedDays}
      onSelect={newRange => onNewRange(newRange)}
      fixedWeeks
      locale={i18n.language === 'en' ? enUS : ru}
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
