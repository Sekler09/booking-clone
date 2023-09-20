import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';
import HotelCard from 'components/hotelCard';
import FancyLoader from 'components/loader';
import SortOptions from 'components/sortOptions';
import Filters from 'components/filters';

import { InputsWrapper } from '../mainPage/styled';
import useFetch from '../../hooks/useFetch';
import { ResultsContainer, ResultsCountInfo, ResultsWrapper } from './styled';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);
  const [initInputs] = useState(inputs);
  const [sorting, setSorting] = useState('DEFAULT');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const {
    data: hotels,
    loading,
    error,
  } = useFetch(`http://localhost:3000/hotels?city=${initInputs.city}`);
  if (error) return <h1>Error</h1>;

  function checkRoomsAvailability(rooms, { from, to }, capacity, count) {
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
        .sort((a, b) => b.capacity - a.capacity)
        .slice(0, count)
        .reduce((sum, room) => sum + room.capacity, 0) >= capacity
    );
  }

  function filterHotelsByDateAndCounts(data) {
    return data.filter(hotel =>
      checkRoomsAvailability(
        hotel.rooms,
        { from: initInputs.dates.from, to: initInputs.dates.to },
        initInputs.counts.children + initInputs.counts.adults,
        initInputs.counts.rooms,
      ),
    );
  }

  useEffect(() => {
    if (hotels)
      if (hotels.length) setFilteredHotels(filterHotelsByDateAndCounts(hotels));
  }, [hotels, loading, error]);

  function getAverageRating(hotel) {
    const reviews = hotel.rooms.reduce(
      (allReviews, room) => allReviews.concat(room.reviews),
      [],
    );
    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    return totalRatings / reviews.length;
  }

  function getSorting(sortingString) {
    switch (sortingString) {
      case 'DEFAULT':
        return () => {};
      case 'PRICE_LOW_TO_HIGH':
        return (a, b) => {
          return (
            Math.min(...a.rooms.map(room => room.price_per_night)) -
            Math.min(...b.rooms.map(room => room.price_per_night))
          );
        };
      case 'PRICE_HIGH_TO_LOW':
        return (a, b) => {
          return (
            Math.max(...b.rooms.map(room => room.price_per_night)) -
            Math.max(...a.rooms.map(room => room.price_per_night))
          );
        };
      case 'RATING_HIGH_TO_LOW':
        return (a, b) => {
          return getAverageRating(b) - getAverageRating(a);
        };
      case 'RATING_LOW_TO_HIGH':
        return (a, b) => {
          return getAverageRating(a) - getAverageRating(b);
        };
      default:
        return () => {};
    }
  }

  const sortingFunction = getSorting(sorting);
  const resultInfo = (
    <h1>
      {initInputs.city}: {filteredHotels.length} hotel
      {filteredHotels.length > 1 ? 's' : ''} found
    </h1>
  );

  return (
    <>
      <InputsWrapper>
        <CityInput />
        <CalendarInput />
        <CountInput />
        <SearchButton />
      </InputsWrapper>
      {loading && <FancyLoader />}
      {!loading && (
        <ResultsWrapper>
          <Filters hotels={hotels} onFilter={setFilteredHotels} />
          <ResultsContainer>
            <ResultsCountInfo>{resultInfo}</ResultsCountInfo>
            <SortOptions onChangeSort={setSorting} />
            <div>
              {filteredHotels.sort(sortingFunction).map(hotel => (
                <HotelCard hotel={hotel} key={hotel.id} />
              ))}
            </div>
          </ResultsContainer>
        </ResultsWrapper>
      )}
    </>
  );
}
