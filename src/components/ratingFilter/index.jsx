import React, { useEffect, useState } from 'react';
import { string, number, shape, arrayOf, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import CheckboxFilter from 'components/checkboxFilter';
import getAverageRating from 'utils/getAverageHotelRating';

export default function RatingFilter({ hotels, onChange }) {
  const { t } = useTranslation();
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

  function onCheckboxChange(checked, value) {
    if (checked) {
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
      label: `${t('superb')}: 4.5+`,
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4.5).length,
      checked: checkedRatings.includes(4.5),
    },
    {
      value: 4,
      label: `${t('veryGood')}: 4+`,
      count: hotels.filter(hotel => getAverageRating(hotel) >= 4).length,
      checked: checkedRatings.includes(4),
    },
    {
      value: 3.5,
      label: `${t('good')}: 3.5+`,
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3.5).length,
      checked: checkedRatings.includes(3.5),
    },
    {
      value: 3,
      label: `${t('pleasant')}: 3+`,
      count: hotels.filter(hotel => getAverageRating(hotel) >= 3).length,
      checked: checkedRatings.includes(3),
    },
  ];

  return (
    (checkedRatings.length ? true : !!hotels.length) && (
      <CheckboxFilter
        title={t('reviewFilterTitle')}
        checkboxes={checkboxes}
        onChange={(e, v) => onCheckboxChange(e, v)}
      />
    )
  );
}

RatingFilter.propTypes = {
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
  onChange: func.isRequired,
};
