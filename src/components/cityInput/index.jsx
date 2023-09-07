import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import hotelIcon from 'assets/hotel.png';

import { useSearchParams } from 'react-router-dom';

import { setCity } from 'store/slices/inputsSlice';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';

export default function CityInput() {
  const city = useSelector(state => state.inputs.city);
  const [place, setPlace] = useState(city);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    dispatch(setCity(place));
    if (place) {
      searchParams.set('city', place);
    } else {
      searchParams.delete('city');
    }
    setSearchParams(searchParams);
  }, [place]);

  function onPlaceChange(e) {
    setPlace(e.target.value);
  }

  return (
    <MainInputWrapper>
      <MainInputImg src={hotelIcon} alt="" />
      <MainInput
        type="text"
        placeholder="Where are you going?"
        value={place}
        onChange={e => onPlaceChange(e)}
      />
    </MainInputWrapper>
  );
}
