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

  function onCheckbox(e, value) {
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

  const checkboxes = [
    {
      value: 4.5,
      label: 'Superb: 4.5+',
      onChange: e => onCheckbox(e, 4.5),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4.5).length,
      checked: checkedRatings.includes(4.5),
    },
    {
      value: 4,
      label: 'Very good: 4+',
      onChange: e => onCheckbox(e, 4),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4).length,
      checked: checkedRatings.includes(4),
    },
    {
      value: 3.5,
      label: 'Good: 3.5+',
      onChange: e => onCheckbox(e, 3.5),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3.5).length,
      checked: checkedRatings.includes(3.5),
    },
    {
      value: 3,
      label: 'Pleasant: 3+',
      onChange: e => onCheckbox(e, 3),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3).length,
      checked: checkedRatings.includes(3),
    },
  ];

  return <CheckboxFilter title={title} checkboxes={checkboxes} />;
}

RatingFilter.propTypes = {
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
  onChange: PropTypes.func.isRequired,
};
