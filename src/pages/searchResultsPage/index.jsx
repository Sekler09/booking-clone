import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';
import HotelCard from 'components/hotelCard';

import { InputsWrapper } from '../mainPage/styled';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);

  function checkRoomsAvalibility(rooms, { from, to }, capacity, count) {
    if (rooms.length < count) return false;
    const availableRooms = rooms.filter(
      room =>
        !room.booked_dates.find(
          date =>
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to),
        ),
    );
    if (availableRooms.length < count) return false;
    return (
      availableRooms
        .sort((a, b) => a - b)
        .slice(0, count)
        .reduce((sum, room) => sum + room.capacity, 0) >= capacity
    );
  }

  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/hotels?city=${inputs.city}`)
      .then(r => r.json())
      .then(data =>
        setHotels(
          data.filter(hotel =>
            checkRoomsAvalibility(
              hotel.rooms,
              { from: inputs.dates.from, to: inputs.dates.to },
              inputs.counts.children + inputs.counts.adults,
              inputs.counts.rooms,
            ),
          ),
        ),
      );
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
        {hotels.map(hotel => (
          <HotelCard hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </>
  );
}
