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

function CheckboxFilter({ title, checkboxes }) {
  return (
    <FilterContainer>
      <h3>{title}</h3>
      {checkboxes
        .filter(cb => cb.checked || cb.count !== 0)
        .map(cb => (
          <CheckboxLabel key={cb.label}>
            <CheckboxInput
              type="checkbox"
              onChange={cb.onChange}
              checked={cb.checked}
            />
            <CheckboxField>
              <TickIcon />
            </CheckboxField>
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
  checkboxes: arrayOf(
    shape({
      value: number.isRequired,
      label: string.isRequired,
      onChange: func.isRequired,
      count: number.isRequired,
      checked: bool.isRequired,
    }),
  ).isRequired,
};
