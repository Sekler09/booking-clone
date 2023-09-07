import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { addDays, addYears, endOfYear, format, startOfMonth } from 'date-fns';

import CalendarIcon from 'assets/calendar.png';

import { setDate } from 'store/slices/inputsSlice';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';
import { DayPickerWrapper } from './styled';

const DATE_FORMAT_PATTERN = 'iii d MMM';

export default function CalendarInput() {
  const dates = useSelector(state => state.inputs.dates);
  const [range, setRange] = useState(() => ({
    from: dates.from ? new Date(dates.from) : null,
    to: dates.to ? new Date(dates.to) : null,
  }));
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const today = new Date();
  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  function getInputText() {
    let text = 'Check-in date -- Check-out date';
    if (range.from) {
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
    return text;
  }
  const text = getInputText();

  const notInitialRender = useRef(false);
  useEffect(() => {
    if (notInitialRender.current) {
      dispatch(
        setDate({
          from: range.from ? format(range.from, 'y-M-d') : null,
          to: range.to ? format(range.to, 'y-M-d') : null,
        }),
      );
    } else {
      notInitialRender.current = true;
    }
  }, [range]);

  function onRangeSelect(newRange) {
    if (!newRange) {
      setRange({ from: null, to: null });
    } else if (!newRange.to) {
      setRange({ ...newRange, to: null });
    } else {
      setRange(newRange);
    }
  }

  const calendarRef = useRef();
  useEffect(() => {
    function onClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    if (showCalendar) {
      setTimeout(() => document.addEventListener('click', onClickOutside), 0);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [showCalendar]);

  function onInputClick() {
    setShowCalendar(prevShow => !prevShow);
  }

  return (
    <MainInputWrapper onClick={!showCalendar ? onInputClick : () => {}}>
      <MainInputImg src={CalendarIcon} alt="" />
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
            onSelect={newRange => onRangeSelect(newRange)}
            numberOfMonths={2}
            disabled={disabledDays}
            weekStartsOn={1}
          />
        </DayPickerWrapper>
      )}
    </MainInputWrapper>
  );
}
