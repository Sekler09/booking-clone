import CalendarIcon from 'assets/calendar.png';
import { addDays, addYears, endOfYear, format, startOfMonth } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';

import {
  CalendarImg,
  CalendarInputWrapper,
  DayPickerWrapper,
  StyledCalendarInput,
} from './styled';

const DATE_FORMAT_PATTERN = 'iii d MMM';
const today = new Date();

export default function CalendarInput() {
  const [range, setRange] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  let text = 'Check-in date -- Check-out date';
  if (range?.from) {
    if (!range.to) {
      text = `${format(range.from, DATE_FORMAT_PATTERN)} -- checkout date`;
    } else if (range.to) {
      text = `${format(range.from, DATE_FORMAT_PATTERN)} -- ${format(
        range.to,
        DATE_FORMAT_PATTERN,
      )}
      `;
    }
  }

  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      setTimeout(
        () => document.addEventListener('click', handleClickOutside),
        0,
      );
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCalendar, calendarRef, showCalendar]);

  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  const handleInputClick = () => {
    setShowCalendar(prevShow => !prevShow);
  };

  return (
    <CalendarInputWrapper onClick={!showCalendar && handleInputClick}>
      <CalendarImg src={CalendarIcon} alt="Calendar Image" />
      <StyledCalendarInput type="text" readOnly value={text} />
      {showCalendar && (
        <DayPickerWrapper ref={calendarRef}>
          <DayPicker
            style={{ color: 'black' }}
            mode="range"
            fromMonth={today}
            toMonth={endOfYear(addYears(today, 1))}
            defaultMonth={new Date()}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={disabledDays}
            weekStartsOn={1}
          />
        </DayPickerWrapper>
      )}
    </CalendarInputWrapper>
  );
}
