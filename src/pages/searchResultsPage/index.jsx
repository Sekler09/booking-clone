import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';
import HotelCard from 'components/hotelCard';
import FancyLoader from 'components/loader';
import SortOptions from 'components/sortOptions';
import PriceFilter from 'components/priceFilter';

import { InputsWrapper } from '../mainPage/styled';
import useFetch from '../../hooks/useFetch';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);
  const [initInputs] = useState(inputs);
  const [sorting, setSorting] = useState('DEFAULT');

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

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

  function filterHotels(hotels) {
    return hotels.filter(hotel =>
      checkRoomsAvailability(
        hotel.rooms,
        { from: initInputs.dates.from, to: initInputs.dates.to },
        initInputs.counts.children + initInputs.counts.adults,
        initInputs.counts.rooms,
      ),
    );
  }

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

  function getMaxAndMinPrice(hotels) {
    const prices = hotels
      .map(hotel => hotel.rooms.map(room => room.price_per_night))
      .flat();
    return { max: Math.max(...prices), min: Math.min(...prices) };
  }

  function filterHotelByPrice(hotel, min, max) {
    return hotel.rooms
      .map(room => room.price_per_night)
      .find(price => price <= max && price >= min);
  }

  const {
    data: hotels,
    loading,
    error,
  } = useFetch(`http://localhost:3000/hotels?city=${initInputs.city}`);
  if (error) return <h1>Error</h1>;

  const filteredHotels = hotels ? filterHotels(hotels) : [];
  const { min: minRangeValue, max: maxRangeValue } =
    getMaxAndMinPrice(filteredHotels);
  const sortingFunction = getSorting(sorting);
  const hotelsToBeShown = filteredHotels
    .sort(sortingFunction)
    .filter(hotel => filterHotelByPrice(hotel, minPrice, maxPrice));
  const resultInfo = (
    <h1>
      {initInputs.city}: {hotelsToBeShown.length} hotel
      {hotelsToBeShown.length > 1 ? 's' : ''} found
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
        <>
          <h1>
            ${minPrice} - ${maxPrice}
          </h1>
          <PriceFilter
            min={minRangeValue}
            max={maxRangeValue}
            onChange={({ min, max }) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
          <SortOptions onChangeSort={setSorting} />
          <div>
            {hotelsToBeShown.map(hotel => (
              <HotelCard hotel={hotel} key={hotel.id} />
            ))}
          </div>
          <div>{resultInfo}</div>
        </>
      )}
    </>
  );
}
