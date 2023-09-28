import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';

import { InputsWrapper } from './styled';

export default function MainPage() {
  const {
    city,
    dates: { to, from },
    counts: { adults, rooms, children },
  } = useSelector(state => state.inputs);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (city && !searchParams.has('city')) {
      searchParams.set('city', city);
    }
    if (to && !searchParams.has('to')) {
      searchParams.set('to', to);
    }
    if (from && !searchParams.has('from')) {
      searchParams.set('from', from);
    }
    if (adults > 1 && !searchParams.has('adults')) {
      searchParams.set('adults', adults);
    }
    if (rooms > 1 && !searchParams.has('rooms')) {
      searchParams.set('rooms', rooms);
    }
    if (children > 0 && !searchParams.has('children')) {
      searchParams.set('children', children);
    }
    setSearchParams(searchParams);
  }, []);

  return (
    <InputsWrapper>
      <CityInput />
      <CalendarInput />
      <CountInput />
      <SearchButton />
    </InputsWrapper>
  );
}
