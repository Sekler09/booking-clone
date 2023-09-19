import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Dropdown, Option, SortOptionsWrapper } from './styled';

function SortOptions({ onChangeSort }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('DEFAULT');

  const sortingOptions = [
    { value: 'DEFAULT', label: 'Default' },
    { value: 'PRICE_LOW_TO_HIGH', label: 'Price (Low to High)' },
    { value: 'PRICE_HIGH_TO_LOW', label: 'Price (High to Low)' },
    { value: 'RATING_HIGH_TO_LOW', label: 'Rating (High to Low)' },
    { value: 'RATING_LOW_TO_HIGH', label: 'Rating (Low to High)' },
  ];

  const handleOptionClick = value => {
    setSelectedSort(value);
    setIsDropdownOpen(false);
    onChangeSort(value);
  };

  return (
    <SortOptionsWrapper>
      <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Sort By:{' '}
        {sortingOptions.find(option => option.value === selectedSort).label}
      </Button>
      <Dropdown $isOpen={isDropdownOpen}>
        {sortingOptions.map(option => (
          <Option
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </Option>
        ))}
      </Dropdown>
    </SortOptionsWrapper>
  );
}

SortOptions.propTypes = {
  onChangeSort: PropTypes.func.isRequired,
};

export default SortOptions;
