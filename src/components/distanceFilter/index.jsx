import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CheckboxFilter from '../checkboxFilter';

export default function DistanceFilter({ hotels, onChange }) {
  const title = 'Distance from the center';
  const [checkedDistance, setCheckedDistance] = useState([]);

  useEffect(() => {
    onChange(hotel => {
      const max =
        checkedDistance.length > 0 ? Math.max(...checkedDistance) : Infinity;
      return hotel.distance_from_center <= max;
    });
  }, [checkedDistance]);

  function onCheckbox(e, value) {
    if (e.target.checked) setCheckedDistance(prev => [...prev, value]);
    else
      setCheckedDistance(prev => {
        const index = prev.indexOf(value);
        if (index > -1) {
          return [...prev.slice(0, index), ...prev.slice(index + 1)];
        }
        return prev;
      });
  }

  const checkboxes = [
    {
      value: 5,
      label: 'Less than 5km',
      onChange: e => onCheckbox(e, 5),
      count: hotels.filter(hotel => hotel.distance_from_center <= 5).length,
      checked: checkedDistance.includes(5),
    },
    {
      value: 3,
      label: 'Less than 3km',
      onChange: e => onCheckbox(e, 3),
      count: hotels.filter(hotel => hotel.distance_from_center <= 3).length,
      checked: checkedDistance.includes(3),
    },
    {
      value: 1,
      label: 'Less than 1km',
      onChange: e => onCheckbox(e, 1),
      count: hotels.filter(hotel => hotel.distance_from_center <= 1).length,
      checked: checkedDistance.includes(1),
    },
  ];

  return <CheckboxFilter title={title} checkboxes={checkboxes} />;
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
