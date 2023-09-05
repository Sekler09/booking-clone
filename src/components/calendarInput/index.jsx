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

const DATE_FORMAT_PATTERN = 'iiiiii, d MMM.';
const today = new Date();

export default function CalendarInput() {
  const [range, setRange] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  let text = 'checkin date - checkout date';
  if (range?.from) {
    if (!range.to) {
      text = `${format(range.from, DATE_FORMAT_PATTERN)} - checkout date`;
    } else if (range.to) {
      text = `${format(range.from, DATE_FORMAT_PATTERN)}–${format(
        range.to,
        DATE_FORMAT_PATTERN,
      )}
      `;
    }
  }

  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  const calendarRef = useRef();
  const inputRef = useRef();

  const handleInputClick = () => {
    setShowCalendar(prevShow => !prevShow);
  };

  useEffect(() => {
    const listener = event => {
      console.log(inputRef);
      if (inputRef.current.contains(event.currentTarget)) {
        console.log(1);
      }
      console.log(calendarRef.current.contains(event.target));
    };
    document.addEventListener('click', listener);
    return () => {
      document.removeEventListener('click', listener);
    };
  }, [calendarRef]);

  return (
    <CalendarInputWrapper ref={inputRef}>
      <CalendarImg src={CalendarIcon} alt="Calendar Image" />
      <StyledCalendarInput
        type="text"
        readOnly
        value={text}
        onClick={handleInputClick}
      />
      {showCalendar && (
        <DayPickerWrapper ref={calendarRef} $showCalendar={showCalendar}>
          <DayPicker
            style={{ color: 'black' }}
            id="test"
            mode="range"
            fromMonth={today}
            toMonth={endOfYear(addYears(today, 1))}
            defaultMonth={new Date()}
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={disabledDays}
          />
        </DayPickerWrapper>
      )}
    </CalendarInputWrapper>
  );
}
