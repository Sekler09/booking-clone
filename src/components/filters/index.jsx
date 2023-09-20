import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import PriceFilter from '../priceFilter';
import RatingFilter from '../ratingFilter';
import DistanceFilter from '../distanceFilter';

import { FilterItem, FiltersTitle, FiltersWrapper } from './styled';

function getMaxAndMinPrice(hotels) {
  const prices = hotels
    .map(hotel => hotel.rooms.map(room => room.price_per_night))
    .flat();
  return { max: Math.max(...prices), min: Math.min(...prices) };
}

export default function Filters({ hotels, onFilter }) {
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
          .map(room => room.price_per_night)
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
      <FiltersTitle>FilterBy:</FiltersTitle>
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
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      distance_from_center: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      rooms: PropTypes.arrayOf(
        PropTypes.shape({
          price_per_night: PropTypes.number.isRequired,
          reviews: PropTypes.arrayOf(
            PropTypes.shape({
              rating: PropTypes.number.isRequired,
            }),
          ),
        }),
      ),
    }),
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};
