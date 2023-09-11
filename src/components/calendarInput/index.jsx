import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import { addDays, addYears, endOfYear, format, startOfMonth } from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as CalendarLogo } from 'assets/calendar.svg';

import { setDate } from 'store/slices/inputsSlice';
import { DayPickerWrapper } from './styled';
import MainFiltersInput from '../common';

const DATE_FORMAT_PATTERN = 'iii d MMM';

export default function CalendarInput() {
  const { from, to } = useSelector(state => state.inputs.dates);
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();
  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  function checkSearchFromValidity(searchFrom) {
    if (searchFrom) {
      try {
        const fromDate = new Date(searchFrom);
        if (fromDate < today) return false;
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
  function checkSearchToValidity(searchTo) {
    if (searchTo) {
      try {
        const toDate = new Date(searchTo);
        if (toDate > endOfYear(addYears(today, 1))) return false;
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
  const [range, setRange] = useState(() => {
    const searchFrom = searchParams.get('from');
    const searchTo = searchParams.get('to');
    return {
      from: checkSearchFromValidity(searchFrom)
        ? new Date(searchFrom)
        : from
        ? new Date(from)
        : null,
      to: checkSearchToValidity(searchTo)
        ? new Date(searchTo)
        : to
        ? new Date(to)
        : null,
    };
  });
  const dispatch = useDispatch();

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

  function updateSearchParams() {
    if (range.from) {
      searchParams.set('from', format(range.from, 'y-M-d'));
      if (range.to) {
        searchParams.set('to', format(range.to, 'y-M-d'));
      } else {
        searchParams.delete('to');
      }
    } else {
      searchParams.delete('from');
      searchParams.delete('to');
    }
    setSearchParams(searchParams);
  }

  const notInitialRender = useRef(false);
  useEffect(() => {
    if (notInitialRender.current) {
      dispatch(
        setDate({
          from: range.from ? format(range.from, 'y-M-d') : null,
          to: range.to ? format(range.to, 'y-M-d') : null,
        }),
      );
      updateSearchParams();
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

  return (
    <MainFiltersInput
      needModal
      needArrow
      inputValue={text}
      isReadOnly
      onValueChange={() => {}}
      Icon={CalendarLogo}
    >
      <DayPickerWrapper>
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
    </MainFiltersInput>
  );
}
