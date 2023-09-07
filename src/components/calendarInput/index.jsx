import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { addDays, addYears, endOfYear, format, startOfMonth } from 'date-fns';

import CalendarIcon from 'assets/calendar.png';

import { setDate } from 'store/slices/inputsSlice';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';
import { DayPickerWrapper } from './styled';

const DATE_FORMAT_PATTERN = 'iii d MMM';
const today = new Date();

export default function CalendarInput() {
  const dates = useSelector(state => state.inputs.dates);
  const [range, setRange] = useState(() => ({
    from: dates.from ? new Date(dates.from) : null,
    to: dates.to ? new Date(dates.to) : null,
  }));
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const notInitialRender = useRef(false);

  useEffect(() => {
    if (notInitialRender.current)
      dispatch(
        setDate({
          from: range.from ? format(range.from, 'y-M-d') : null,
          to: range.to ? format(range.to, 'y-M-d') : null,
        }),
      );
    else notInitialRender.current = true;
  }, [range]);

  const handleRangeSelect = newRange => {
    if (!newRange) {
      setRange({ from: null, to: null });
    } else if (!newRange.to) {
      setRange({ ...newRange, to: null });
    } else {
      setRange(newRange);
    }
  };

  let text = 'Check-in date -- Check-out date';
  if (range?.from) {
    if (!range.to) {
      text = `${format(range.from, DATE_FORMAT_PATTERN)} -- Check-out date`;
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
    <MainInputWrapper onClick={!showCalendar ? handleInputClick : () => {}}>
      <MainInputImg src={CalendarIcon} alt="Calendar Image" />
      <MainInput type="text" readOnly value={text} />
      {showCalendar && (
        <DayPickerWrapper ref={calendarRef}>
          <DayPicker
            style={{ color: 'black' }}
            mode="range"
            fromMonth={today}
            toMonth={endOfYear(addYears(today, 1))}
            defaultMonth={today}
            selected={range}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            disabled={disabledDays}
            weekStartsOn={1}
          />
        </DayPickerWrapper>
      )}
    </MainInputWrapper>
  );
}
