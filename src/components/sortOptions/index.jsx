import React, { useState } from 'react';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button, Dropdown, Option, SortOptionsWrapper } from './styled';

const sortingOptions = [
  { value: 'DEFAULT', label: 'defaultSortName' },
  { value: 'PRICE_LOW_TO_HIGH', label: 'priceLowFirstSortName' },
  { value: 'PRICE_HIGH_TO_LOW', label: 'priceHighFirstSortName' },
  { value: 'RATING_HIGH_TO_LOW', label: 'ratingLowFirstSortName' },
  { value: 'RATING_LOW_TO_HIGH', label: 'ratingHighFirstSortName' },
];

function SortOptions({ onChangeSort }) {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('DEFAULT');

  const handleOptionClick = value => {
    setSelectedSort(value);
    setIsDropdownOpen(false);
    onChangeSort(value);
  };

  return (
    <SortOptionsWrapper>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        data-cy="sort-options-btn"
      >
        {t('sortBy')}:{' '}
        {t(sortingOptions.find(option => option.value === selectedSort).label)}
      </Button>
      <Dropdown $isOpen={isDropdownOpen}>
        {sortingOptions.map(option => (
          <Option
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            data-cy={option.label}
          >
            {t(option.label)}
          </Option>
        ))}
      </Dropdown>
    </SortOptionsWrapper>
  );
}

SortOptions.propTypes = {
  onChangeSort: func.isRequired,
};

export default SortOptions;
