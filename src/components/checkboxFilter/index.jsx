import React from 'react';
import { string, number, arrayOf, shape, func, bool } from 'prop-types';

import {
  CheckboxField,
  CheckboxInput,
  CheckboxLabel,
  CheckboxLabelCount,
  CheckboxLabelText,
  CheckboxLabelsContainer,
  FilterContainer,
  TickIcon,
} from './styled';

function CheckboxFilter({ title, checkboxes, onChange }) {
  const filteredCheckboxes = checkboxes.filter(
    cb => cb.checked || cb.count !== 0,
  );
  return (
    <FilterContainer>
      <h3 data-cy="checkbox-filter-title">{title}</h3>
      <CheckboxLabelsContainer data-cy="checkbox-filter-items">
        {filteredCheckboxes.map(cb => (
          <CheckboxLabel key={cb.label} data-cy={cb.label}>
            <CheckboxInput
              type="checkbox"
              onChange={e => onChange(e.target.checked, cb.value)}
              checked={cb.checked}
              data-cy="checkbox-filter-input"
            />
            <CheckboxField>{cb.checked && <TickIcon />}</CheckboxField>
            <CheckboxLabelText data-cy="checkbox-label">
              {cb.label}
            </CheckboxLabelText>
            <CheckboxLabelCount data-cy="checkbox-count">
              {cb.count}
            </CheckboxLabelCount>
          </CheckboxLabel>
        ))}
      </CheckboxLabelsContainer>
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
