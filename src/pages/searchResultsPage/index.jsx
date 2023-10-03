import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import CalendarInput from 'components/calendarInput';
import CityInput from 'components/cityInput';
import CountInput from 'components/countInput';
import SearchButton from 'components/searchButton';
import HotelCard from 'components/hotelCard';
import FancyLoader from 'components/loader';
import SortOptions from 'components/sortOptions';
import Filters from 'components/filters';

import getInitCounterStateFormParamsAndRedux from 'utils/getInitCounterStateFormParamsAndRedux';
import { getSorting } from 'utils/sortingHelpers';
import { InputsWrapper } from 'pages/mainPage/styled';
import getHotelsByCity from 'api/getHotelsByCity';

import {
  EmptyResult,
  ErrorIcon,
  ErrorWrapper,
  ResultsContainer,
  ResultsCountInfo,
  ResultsWrapper,
  SearchIcon,
} from './styled';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);
  const [initInputs] = useState(inputs);
  const [sorting, setSorting] = useState('DEFAULT');
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    from: null,
    to: null,
    adults: 1,
    children: 0,
    rooms: 1,
  });

  function checkRoomsAvailability(rooms, from, to, capacity, count) {
    if (rooms.length < count) {
      return false;
    }

    const availableRooms = rooms.filter(
      room =>
        !room.booked_dates.find(
          date =>
            new Date(date) >= new Date(from) && new Date(date) <= new Date(to),
        ),
    );

    if (availableRooms.length < count) {
      return false;
    }

    return (
      availableRooms
        .sort((a, b) => b.capacity - a.capacity)
        .slice(0, count)
        .reduce((sum, room) => sum + room.capacity, 0) >= capacity
    );
  }

  function filterHotelsByDateAndCounts(data, from, to, capacity, count) {
    return data.filter(hotel =>
      checkRoomsAvailability(hotel.rooms, from, to, capacity, count),
    );
  }

  useEffect(() => {
    const city = searchParams.has('city')
      ? searchParams.get('city')
      : initInputs.city;
    const from = searchParams.has('from')
      ? searchParams.get('from')
      : initInputs.dates.from;
    const to = searchParams.has('to')
      ? searchParams.get('to')
      : initInputs.dates.to;
    const adults = getInitCounterStateFormParamsAndRedux(
      'adults',
      initInputs.adults,
      1,
      30,
      searchParams,
    );
    const rooms = getInitCounterStateFormParamsAndRedux(
      'rooms',
      initInputs.rooms,
      1,
      30,
      searchParams,
    );
    const children = getInitCounterStateFormParamsAndRedux(
      'children',
      initInputs.children,
      0,
      10,
      searchParams,
    );
    setSearchFilters({
      city,
      from,
      to,
      adults,
      rooms,
      children,
    });

    getHotelsByCity(city)
      .then(r => r.json())
      .then(data => {
        const initHotels = filterHotelsByDateAndCounts(
          data,
          from,
          to,
          adults + children,
          rooms,
        );
        setHotels(initHotels);
        setFilteredHotels(initHotels);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const sortingFunction = getSorting(sorting);
  const resultInfo = (
    <h1>
      {searchFilters.city}: {filteredHotels.length} hotel
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
      <ResultsWrapper>
        {!loading && !error && hotels.length !== 0 && (
          <>
            <Filters hotels={hotels} onFilter={setFilteredHotels} />
            <ResultsContainer>
              <ResultsCountInfo>{resultInfo}</ResultsCountInfo>
              <SortOptions onChangeSort={setSorting} />
              <div data-cy="hotels-list">
                {filteredHotels.sort(sortingFunction).map(hotel => (
                  <HotelCard hotel={hotel} key={hotel.id} />
                ))}
              </div>
            </ResultsContainer>
          </>
        )}
        {!loading && !error && filteredHotels.length === 0 && (
          <EmptyResult data-cy="no-hotels-found">
            <SearchIcon />
            <p>No properties found in {searchFilters.city}</p>
            <p>
              There are no matching properties for your search criteria. Try
              updating your search.
            </p>
          </EmptyResult>
        )}
        {error && (
          <ErrorWrapper>
            <ErrorIcon />
            <p>Something went wrong. Try again later</p>
          </ErrorWrapper>
        )}
      </ResultsWrapper>
    </>
  );
}
