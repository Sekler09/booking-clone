import hotelIcon from 'assets/hotel.png';
import React, { useState } from 'react';

import { CityInputWrapper, HotelImg, StyledCityInput } from './styled';

export default function CityInput() {
  const [city, setCity] = useState('');
  const handleCityChange = e => setCity(e.target.value);

  return (
    <CityInputWrapper>
      <HotelImg src={hotelIcon} alt="Hotel Image" />
      <StyledCityInput
        type="text"
        placeholder="Choose place to visit"
        value={city}
        onChange={handleCityChange}
      />
    </CityInputWrapper>
  );
}
