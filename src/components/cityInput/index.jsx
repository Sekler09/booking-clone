import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as HotelIcon } from 'assets/hotel.svg';

import { useSearchParams } from 'react-router-dom';

import { setCity } from 'store/slices/inputsSlice';
import { MainInput, MainInputWrapper } from '../common/styled';

export default function CityInput() {
  const city = useSelector(state => state.inputs.city);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [place, setPlace] = useState(() => {
    const searchCity = searchParams.get('city');
    return searchCity || city;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCity(place));
    searchParams.set('city', place);
    if (!place) {
      searchParams.delete('city');
    }
    setSearchParams(searchParams);
  }, [place]);

  function onPlaceChange(e) {
    setPlace(e.target.value);
  }

  return (
    <MainInputWrapper>
      <HotelIcon />
      <MainInput
        type="text"
        placeholder="Where are you going?"
        value={place}
        onChange={e => onPlaceChange(e)}
      />
    </MainInputWrapper>
  );
}
