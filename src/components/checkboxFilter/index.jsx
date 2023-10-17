import React from 'react';
import { string, number, arrayOf, shape, func, bool } from 'prop-types';

import {
  CheckboxField,
  CheckboxInput,
  CheckboxLabel,
  CheckboxLabelCount,
  CheckboxLabelText,
  FilterContainer,
  TickIcon,
} from './styled';

function CheckboxFilter({ title, checkboxes, onChange }) {
  const filteredCheckboxes = checkboxes.filter(
    cb => cb.checked || cb.count !== 0,
  );
  return (
    <FilterContainer data-cy="checkbox-filter">
      <h3>{title}</h3>
      {filteredCheckboxes.map(cb => (
        <CheckboxLabel key={cb.label} data-cy={cb.label}>
          <CheckboxInput
            type="checkbox"
            onChange={e => onChange(e, cb.value)}
            checked={cb.checked}
            data-cy="checkbox-filter-input"
          />
          <CheckboxField>{cb.checked && <TickIcon />}</CheckboxField>
          <CheckboxLabelText>{cb.label}</CheckboxLabelText>
          <CheckboxLabelCount>{cb.count}</CheckboxLabelCount>
        </CheckboxLabel>
      ))}
    </FilterContainer>
  );
}

export default CheckboxFilter;

CheckboxFilter.propTypes = {
  title: string.isRequired,
  onChange: func.isRequired,
  checkboxes: arrayOf(
    shape({
      value: number.isRequired,
      label: string.isRequired,
      count: number.isRequired,
      checked: bool.isRequired,
    }),
  ).isRequired,
};
