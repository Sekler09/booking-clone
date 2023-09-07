import React from 'react';
import { useSelector } from 'react-redux';

import CalendarInput from '../../components/calendarInput';
import CityInput from '../../components/cityInput';
import CountInput from '../../components/countInput';
import SearchButton from '../../components/searchButton';
import { InputsWrapper } from '../mainPage/styled';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);

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
