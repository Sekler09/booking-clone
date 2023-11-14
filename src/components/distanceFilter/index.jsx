import React, { useState } from 'react';
import { string, number, shape, arrayOf, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import CheckboxFilter from 'components/checkboxFilter';

export default function DistanceFilter({ hotels, onChange }) {
  const { t } = useTranslation();

  const [checkedDistance, setCheckedDistance] = useState([]);

  function getFilterByDistance(dist) {
    return hotel => {
      const max = dist.length > 0 ? Math.max(...dist) : Infinity;
      return hotel.distanceFromCenter <= max;
    };
  }

  function onCheckboxChange(checked, value) {
    if (checked) {
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
      label: `${t('lessThan')} 5 ${t('km')}`,
      count: hotels.filter(hotel => hotel.distanceFromCenter <= 5).length,
      checked: checkedDistance.includes(5),
    },
    {
      value: 3,
      label: `${t('lessThan')} 3 ${t('km')}`,
      count: hotels.filter(hotel => hotel.distanceFromCenter <= 3).length,
      checked: checkedDistance.includes(3),
    },
    {
      value: 1,
      label: `${t('lessThan')} 1 ${t('km')}`,
      count: hotels.filter(hotel => hotel.distanceFromCenter <= 1).length,
      checked: checkedDistance.includes(1),
    },
  ];

  return (
    (checkedDistance.length ? true : !!hotels.length) && (
      <CheckboxFilter
        title={t('distanceFilterTitle')}
        checkboxes={checkboxes}
        onChange={(e, v) => onCheckboxChange(e, v)}
      />
    )
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
      distanceFromCenter: number.isRequired,
      rooms: arrayOf(
        shape({
          pricePerNight: number.isRequired,
        }),
      ),
      reviews: arrayOf(
        shape({
          rating: number.isRequired,
        }),
      ),
    }),
  ).isRequired,
  onChange: func.isRequired,
};
