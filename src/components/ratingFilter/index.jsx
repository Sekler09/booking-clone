import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getAverageRating from 'utils/getAverageHotelRating';
import CheckboxFilter from '../checkboxFilter';

export default function RatingFilter({ hotels, onChange }) {
  const title = 'Review Score';
  const [checkedRatings, setCheckedRatings] = useState([]);

  useEffect(() => {
    onChange(hotel => {
      const min = checkedRatings.length > 0 ? Math.min(...checkedRatings) : 0;
      return getAverageRating(hotel) >= min;
    });
  }, [checkedRatings]);

  function getHighestAndLowestRating(hotelsToFilter) {
    const ratings = hotelsToFilter.map(hotel => getAverageRating(hotel));
    return {
      min: Math.min(...ratings),
      max: Math.max(...ratings),
    };
  }

  function f(e, value) {
    if (e.target.checked) setCheckedRatings(prev => [...prev, value]);
    else
      setCheckedRatings(prev => {
        const index = prev.indexOf(value);
        if (index > -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        }
        return prev;
      });
  }

  const Labels = [
    'Superb: 4.5+',
    'Very Good: 4+',
    'Good: 3.5+',
    'Pleasant: 3+',
  ];

  const OnChanges = [
    e => f(e, 4.5),
    e => f(e, 4),
    e => f(e, 3.5),
    e => f(e, 3),
  ];

  const ratings = [3, 3.5, 4, 4.5];
  const CountQuantities = [...ratings]
    .reverse()
    .map(rating => hs => hs.filter(hotel => getAverageRating(hotel) >= rating));

  function getLabelsAndOnChanges(hotelsToFilter) {
    const { min, max } = getHighestAndLowestRating(hotelsToFilter);
    const more = ratings.filter(rating => rating <= max).length;
    const less = ratings.filter(rating => min >= rating).length;
    if (more === less)
      return {
        labels: [],
        onChanges: [],
        quantities: [],
      };
    return {
      labels: Labels.slice(4 - more, 5 - less),
      onChanges: OnChanges.slice(4 - more, 5 - less),
      quantities: CountQuantities.slice(4 - more, 5 - less).map(
        fn => fn(hotels).length,
      ),
    };
  }

  const { labels, onChanges, quantities } = getLabelsAndOnChanges(hotels);
  return (
    <CheckboxFilter
      title={title}
      labels={labels}
      quantities={quantities}
      onChanges={onChanges}
    />
  );
}

RatingFilter.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
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
  onChange: PropTypes.func.isRequired,
};
