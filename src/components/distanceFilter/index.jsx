import React, { useState } from 'react';
import { string, number, shape, arrayOf, func } from 'prop-types';

import CheckboxFilter from 'components/checkboxFilter';

export default function DistanceFilter({ hotels, onChange }) {
  const [checkedDistance, setCheckedDistance] = useState([]);

  function getFilterByDistance(dist) {
    return hotel => {
      const max = dist.length > 0 ? Math.max(...dist) : Infinity;
      return hotel.distance_from_center <= max;
    };
  }

  function onCheckboxChange(e, value) {
    if (e.target.checked) {
      setCheckedDistance(prev => {
        const newChecked = [...prev, value];
        onChange(getFilterByDistance(newChecked));
        return newChecked;
      });
    } else {
      setCheckedDistance(prev => {
        const index = prev.indexOf(value);
        if (index > -1) {
          const newChecked = [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ];
          onChange(getFilterByDistance(newChecked));
          return newChecked;
        }
        return prev;
      });
    }
  }

  const checkboxes = [
    {
      value: 5,
      label: 'Less than 5km',
      count: hotels.filter(hotel => hotel.distance_from_center <= 5).length,
      checked: checkedDistance.includes(5),
    },
    {
      value: 3,
      label: 'Less than 3km',
      count: hotels.filter(hotel => hotel.distance_from_center <= 3).length,
      checked: checkedDistance.includes(3),
    },
    {
      value: 1,
      label: 'Less than 1km',
      count: hotels.filter(hotel => hotel.distance_from_center <= 1).length,
      checked: checkedDistance.includes(1),
    },
  ];

  return (
    <CheckboxFilter
      title="Distance from the center"
      checkboxes={checkboxes}
      onChange={(e, v) => onCheckboxChange(e, v)}
    />
  );
}

DistanceFilter.propTypes = {
  hotels: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired,
      city: string.isRequired,
      address: string.isRequired,
      image: string.isRequired,
      distance_from_center: number.isRequired,
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
