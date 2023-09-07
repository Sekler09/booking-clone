import hotelIcon from 'assets/hotel.png';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCity } from '../../store/slices/inputsSlice';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';

export default function CityInput() {
  const city = useSelector(state => state.inputs.city);
  const [place, setPlace] = useState(city);
  const handlePlaceChange = e => setPlace(e.target.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCity(place));
  });
  return (
    <MainInputWrapper>
      <MainInputImg src={hotelIcon} alt="Hotel" />
      <MainInput
        type="text"
        placeholder="Where are you going?"
        value={place}
        onChange={handlePlaceChange}
      />
    </MainInputWrapper>
  );
}
