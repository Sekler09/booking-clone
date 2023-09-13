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
    if (city) searchParams.set('city', city);
    if (to) searchParams.set('to', to);
    if (to) searchParams.set('from', from);
    if (adults > 1) searchParams.set('adults', adults);
    if (rooms > 1) searchParams.set('rooms', rooms);
    if (children > 0) searchParams.set('children', children);
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
