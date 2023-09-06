import hotelIcon from 'assets/hotel.png';
import React, { useState } from 'react';

import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';

export default function CityInput() {
  const [city, setCity] = useState('');
  const handleCityChange = e => setCity(e.target.value);

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
