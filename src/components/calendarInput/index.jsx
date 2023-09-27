import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import {
  addDays,
  addYears,
  endOfYear,
  format,
  startOfMonth,
  startOfToday,
} from 'date-fns';
import { useSearchParams } from 'react-router-dom';

import MainFiltersInput from 'components/mainFiltersInput';
import { useModal } from 'hooks/useModal';
import {
  checkSearchFromValidity,
  checkSearchToValidity,
} from 'utils/urlHelpers';
import { setDate } from 'store/slices/inputsSlice';
import { DATE_FORMAT_PATTERN } from 'constants/date';

import { ReactComponent as CalendarLogo } from 'assets/calendar.svg';

import { DayPickerWrapper } from './styled';

export default function CalendarInput() {
  const [isOpen, onOpen, onClose] = useModal();
  const dispatch = useDispatch();
  const { from, to } = useSelector(state => state.inputs.dates);
  const [searchParams, setSearchParams] = useSearchParams();

  function getFromDate(searchFrom) {
    if (checkSearchFromValidity(searchFrom)) {
      return new Date(searchFrom);
    }
    if (from) {
      return new Date(from);
    }
    return null;
  }

  function getToDate(searchTo) {
    if (checkSearchToValidity(searchTo)) {
      return new Date(searchTo);
    }
    if (to) {
      return new Date(to);
    }
    return null;
  }
  const [range, setRange] = useState(() => {
    const searchFrom = searchParams.get('from');
    const searchTo = searchParams.get('to');
    return {
      from: getFromDate(searchFrom),
      to: getToDate(searchTo),
    };
  });

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

  useEffect(() => {
    dispatch(
      setDate({
        from: range.from ? format(range.from, 'y-M-d') : null,
        to: range.to ? format(range.to, 'y-M-d') : null,
      }),
    );
    updateSearchParams();
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

  function getInputText() {
    let text = 'Check-in date -- Check-out date';
    if (range.from) {
      if (!range.to) {
        text = `${format(range.from, DATE_FORMAT_PATTERN)} -- Check-out date`;
      } else {
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

  const today = startOfToday();
  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  return (
    <MainFiltersInput
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      needArrow
      inputValue={text}
      isReadOnly
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
