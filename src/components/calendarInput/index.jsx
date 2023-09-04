/* eslint-disable import/no-extraneous-dependencies */
import 'react-day-picker/dist/style.css';

import CalendarIcon from 'assets/calendar.png';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';

import { CalendarImg, CityInputWrapper, StyledCityInput } from './styled';

export default function CalendarInput() {
  const [range, setRange] = useState('');

  let text = 'Please pick the first day.';
  if (range?.from) {
    if (!range.to) {
      text = `${format(range.from, 'PPP')}`;
    } else if (range.to) {
      text = `${format(range.from, 'PPP')}–${format(range.to, 'PPP')}
      `;
    }
  }
  return (
    <CityInputWrapper>
      <CalendarImg src={CalendarIcon} alt="Calendar Image" />
      <StyledCityInput type="text" readOnly value={text} />
      <DayPicker
        style={{ color: 'black' }}
        id="test"
        mode="range"
        defaultMonth={new Date()}
        selected={range}
        onSelect={setRange}
      />
    </CityInputWrapper>
  );
}
