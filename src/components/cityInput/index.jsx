import hotelIcon from 'assets/hotel.png';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeCity } from '../../store/slices/inputsSlice';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';

export default function CityInput() {
  const [city, setCity] = useState('');
  const handleCityChange = e => setCity(e.target.value);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeCity(city));
  });
  return (
    <MainInputWrapper>
      <MainInputImg src={hotelIcon} alt="Hotel" />
      <MainInput
        type="text"
        placeholder="Where are you going?"
        value={city}
        onChange={handleCityChange}
      />
    </MainInputWrapper>
  );
}
