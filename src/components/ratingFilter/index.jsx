import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import getAverageRating from 'utils/getAverageHotelRating';

import CheckboxFilter from '../checkboxFilter';

export default function RatingFilter({ hotels, onChange }) {
  const [checkedRatings, setCheckedRatings] = useState([]);

  useEffect(() => {
    onChange(hotel => {
      const min = checkedRatings.length > 0 ? Math.min(...checkedRatings) : 0;
      return getAverageRating(hotel) >= min;
    });
  }, [checkedRatings]);

  function getFilterByRating(ratings) {
    return hotel => {
      const min = ratings.length > 0 ? Math.min(...ratings) : 0;
      return getAverageRating(hotel) >= min;
    };
  }

  function onCheckboxChange(e, value) {
    if (e.target.checked) {
      setCheckedRatings(prev => {
        const newChecked = [...prev, value];
        onChange(getFilterByRating(newChecked));
        return newChecked;
      });
    } else {
      setCheckedRatings(prev => {
        const index = prev.indexOf(value);
        if (index > -1) {
          const newChecked = [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];
          onChange(getFilterByRating(newChecked));
          return newChecked;
        }
        return prev;
      });
    }
  }

  const checkboxes = [
    {
      value: 4.5,
      label: 'Superb: 4.5+',
      onChange: e => onCheckboxChange(e, 4.5),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4.5).length,
      checked: checkedRatings.includes(4.5),
    },
    {
      value: 4,
      label: 'Very good: 4+',
      onChange: e => onCheckboxChange(e, 4),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4).length,
      checked: checkedRatings.includes(4),
    },
    {
      value: 3.5,
      label: 'Good: 3.5+',
      onChange: e => onCheckboxChange(e, 3.5),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3.5).length,
      checked: checkedRatings.includes(3.5),
    },
    {
      value: 3,
      label: 'Pleasant: 3+',
      onChange: e => onCheckboxChange(e, 3),
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3).length,
      checked: checkedRatings.includes(3),
    },
  ];

  return <CheckboxFilter title="Review Score" checkboxes={checkboxes} />;
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
