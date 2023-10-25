import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import MainFiltersInput from 'components/mainFiltersInput';
import DateRangePicker from 'components/dateRangePicker';
import { useModal } from 'hooks/useModal';
import {
  checkSearchFromValidity,
  checkSearchToValidity,
} from 'utils/urlHelpers';
import { setDate } from 'store/slices/inputsSlice';
import { DATE_FORMAT_PATTERN_RU, DATE_FORMAT_PATTERN_EN } from 'constants/date';

import { ReactComponent as CalendarLogo } from 'assets/calendar.svg';

import { enUS, ru } from 'date-fns/locale';
import { DayPickerWrapper } from './styled';

export default function CalendarInput() {
  const [isOpen, onOpen, onClose] = useModal();
  const dispatch = useDispatch();
  const { from, to } = useSelector(state => state.inputs.dates);
  const [searchParams, setSearchParams] = useSearchParams();

  const { t, i18n } = useTranslation();

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
    const newDate = {
      from: range.from ? format(range.from, 'y-M-d') : null,
      to: range.to ? format(range.to, 'y-M-d') : null,
    };
    dispatch(setDate(newDate));
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

  const locale = i18n.language === 'en' ? enUS : ru;
  const DATE_FORMAT_PATTERN =
    i18n.language === 'en' ? DATE_FORMAT_PATTERN_EN : DATE_FORMAT_PATTERN_RU;

  function getInputText() {
    let text = `${t('checkinDate')} -- ${t('checkoutDate')}`;
    if (range.from) {
      if (!range.to) {
        text = `${format(range.from, DATE_FORMAT_PATTERN, {
          locale,
        })} -- ${t('checkoutDate')}`;
      } else {
        text = `${format(range.from, DATE_FORMAT_PATTERN, {
          locale,
        })} -- ${format(range.to, DATE_FORMAT_PATTERN, { locale })}`;
      }
    }
    return text;
  }

  const text = getInputText();

  return (
    <MainFiltersInput
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      needArrow
      inputValue={text}
      isReadOnly
      Icon={<CalendarLogo />}
    >
      <DayPickerWrapper data-cy="dates-wrapper">
        <DateRangePicker
          selectedDays={range}
          onNewRange={newRange => onRangeSelect(newRange)}
        />
      </DayPickerWrapper>
    </MainFiltersInput>
  );
}
