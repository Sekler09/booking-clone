import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
import getAvailableHotels from 'api/getAvailableHotels';

import {
  EmptyResult,
  ErrorIcon,
  ErrorWrapper,
  ResultsContainer,
  ResultsCountInfo,
  ResultsWrapper,
  SearchCity,
  SearchIcon,
} from './styled';

const defaultSearchFilters = {
  city: '',
  from: null,
  to: null,
  adults: 1,
  children: 0,
  rooms: 1,
};

const defaultSortType = 'DEFAULT';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const [initInputs] = useState(inputs);
  const [sorting, setSorting] = useState(defaultSortType);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilters, setSearchFilters] = useState(defaultSearchFilters);

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
      initInputs.counts.adults,
      1,
      30,
      searchParams,
    );
    const rooms = getInitCounterStateFormParamsAndRedux(
      'rooms',
      initInputs.counts.rooms,
      1,
      30,
      searchParams,
    );
    const children = getInitCounterStateFormParamsAndRedux(
      'children',
      initInputs.counts.children,
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

    getAvailableHotels({ city, from, to, children, adults, rooms })
      .then(r => {
        if (!r.ok) {
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(initHotels => {
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
      <SearchCity>{searchFilters.city.toLowerCase()}</SearchCity>:{' '}
      {filteredHotels.length} {t('searchResultText')}
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
              {!!filteredHotels.length && (
                <>
                  <SortOptions onChangeSort={setSorting} />
                  <div>
                    {filteredHotels.sort(sortingFunction).map(hotel => (
                      <HotelCard hotel={hotel} key={hotel.id} />
                    ))}
                  </div>
                </>
              )}
              {!filteredHotels.length && (
                <EmptyResult data-cy="no-hotels-found">
                  <p>
                    {t('emptyResultTitle')}{' '}
                    <SearchCity>{searchFilters.city.toLowerCase()}</SearchCity>
                  </p>
                </EmptyResult>
              )}
            </ResultsContainer>
          </>
        )}

        {!loading && !error && !hotels.length && (
          <EmptyResult data-cy="no-hotels-found">
            <SearchIcon />
            <p>
              {t('emptyResultTitle')}{' '}
              <SearchCity>{searchFilters.city.toLowerCase()}</SearchCity>
            </p>
            <p>{t('emptyResultText')}</p>
          </EmptyResult>
        )}
        {error && (
          <ErrorWrapper>
            <ErrorIcon />
            <p>{t('fetchErrorText')}</p>
          </ErrorWrapper>
        )}
      </ResultsWrapper>
    </>
  );
}
