import React, { useEffect, useState } from 'react';
import { string, number, shape, arrayOf, func } from 'prop-types';

import CheckboxFilter from 'components/checkboxFilter';
import getAverageRating from 'utils/getAverageHotelRating';

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
  hotels: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      city: string.isRequired,
      address: string.isRequired,
      distance_from_center: number.isRequired,
      image: string.isRequired,
      rooms: arrayOf(
        shape({
          price_per_night: number.isRequired,
          reviews: arrayOf(
            shape({
              rating: number.isRequired,
            }),
          ),
        }),
      ),
    }),
  ).isRequired,
  onChange: func.isRequired,
};
