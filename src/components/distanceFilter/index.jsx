import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CheckboxFilter from '../checkboxFilter';

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
      onChange: e => onCheckboxChange(e, 5),
      count: hotels.filter(hotel => hotel.distance_from_center <= 5).length,
      checked: checkedDistance.includes(5),
    },
    {
      value: 3,
      label: 'Less than 3km',
      onChange: e => onCheckboxChange(e, 3),
      count: hotels.filter(hotel => hotel.distance_from_center <= 3).length,
      checked: checkedDistance.includes(3),
    },
    {
      value: 1,
      label: 'Less than 1km',
      onChange: e => onCheckboxChange(e, 1),
      count: hotels.filter(hotel => hotel.distance_from_center <= 1).length,
      checked: checkedDistance.includes(1),
    },
  ];

  return (
    <CheckboxFilter title="Distance from the center" checkboxes={checkboxes} />
  );
}

DistanceFilter.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      distance_from_center: PropTypes.number.isRequired,
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
