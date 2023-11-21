import React, { useEffect, useState } from 'react';
import { arrayOf, shape, number, string, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import PriceFilter from 'components/priceFilter';
import RatingFilter from 'components/ratingFilter';
import DistanceFilter from 'components/distanceFilter';

import { FilterItem, FiltersTitle, FiltersWrapper } from './styled';

function getMaxAndMinPrice(hotels) {
  const prices = hotels
    .map(hotel => hotel.rooms.map(room => room.price))
    .flat();
  return { max: Math.max(...prices), min: Math.min(...prices) };
}

export default function Filters({ hotels, onFilter }) {
  const { t } = useTranslation();
  const [prices, setPrices] = useState(getMaxAndMinPrice(hotels));
  const [filteringFunctions, setFilteringFunctions] = useState({
    rating: null,
    price: null,
    distance: null,
  });

  useEffect(() => {
    const filteredHotels = hotels.filter(
      hotel =>
        !Object.values(filteringFunctions)
          .filter(fn => fn)
          .map(fn => fn(hotel))
          .some(el => !el),
    );
    onFilter(filteredHotels);
  }, [filteringFunctions]);

  function getFilteredExceptPrice(data) {
    const { price, ...restFilters } = filteringFunctions;
    return data.filter(
      hotel =>
        !Object.values(restFilters)
          .filter(fn => fn)
          .map(fn => fn(hotel))
          .some(el => !el),
    );
  }
  useEffect(() => {
    setPrices(getMaxAndMinPrice(getFilteredExceptPrice(hotels)));
  }, [filteringFunctions]);

  function onPriceFilterChange({ min, max }) {
    setFilteringFunctions(prev => ({
      ...prev,
      price: hotel =>
        hotel.rooms
          .map(room => room.price)
          .find(price => price <= max && price >= min),
    }));
  }

  function getFilteredExceptRating(data) {
    const { rating, ...restFilters } = filteringFunctions;
    return data.filter(
      hotel =>
        !Object.values(restFilters)
          .filter(fn => fn)
          .map(fn => fn(hotel))
          .some(el => !el),
    );
  }

  function getFilteredExceptDistance(data) {
    const { distance, ...restFilters } = filteringFunctions;
    return data.filter(
      hotel =>
        !Object.values(restFilters)
          .filter(fn => fn)
          .map(fn => fn(hotel))
          .some(el => !el),
    );
  }

  return (
    <FiltersWrapper>
      <FiltersTitle>{t('filtersTitle')}</FiltersTitle>
      <FilterItem>
        <PriceFilter
          min={prices.min}
          max={prices.max}
          onChange={({ min, max }) => onPriceFilterChange({ min, max })}
        />
      </FilterItem>
      <FilterItem>
        <RatingFilter
          hotels={getFilteredExceptRating(hotels)}
          onChange={fn =>
            setFilteringFunctions(prev => ({
              ...prev,
              rating: fn,
            }))
          }
        />
      </FilterItem>
      <FilterItem>
        <DistanceFilter
          hotels={getFilteredExceptDistance(hotels)}
          onChange={fn =>
            setFilteringFunctions(prev => ({
              ...prev,
              distance: fn,
            }))
          }
        />
      </FilterItem>
    </FiltersWrapper>
  );
}

Filters.propTypes = {
  hotels: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      city: string.isRequired,
      address: string.isRequired,
      distance: number.isRequired,
      image: string.isRequired,
      rooms: arrayOf(
        shape({
          price: number.isRequired,
        }),
      ),
      reviews: arrayOf(
        shape({
          rating: number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  onFilter: func.isRequired,
};
