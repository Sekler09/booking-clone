import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';

import { InputsWrapper } from '../mainPage/styled';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (inputs.city) {
      searchParams.set('city', inputs.city);
    }
    if (inputs.dates.to) {
      searchParams.set('to', inputs.dates.to);
    }
    if (inputs.dates.to) {
      searchParams.set('from', inputs.dates.from);
    }
    if (inputs.counts.children) {
      searchParams.set('children', inputs.counts.children);
    }
    if (inputs.counts.adults > 1) {
      searchParams.set('adults', inputs.counts.adults);
    }
    if (inputs.counts.rooms > 1) {
      searchParams.set('rooms', inputs.counts.rooms);
    }
    setSearchParams(searchParams);
  }, []);
  return (
    <>
      <InputsWrapper>
        <CityInput />
        <CalendarInput />
        <CountInput />
        <SearchButton />
      </InputsWrapper>
      <div>
        {inputs.city}
        <br />
        {inputs.dates.from} <br />
        {inputs.dates.to}
        <br />
        Chidlren: {inputs.counts.children}
        <br />
        Adults: {inputs.counts.adults}
        <br />
        Rooms: {inputs.counts.rooms}
        <br />
      </div>
    </>
  );
}
