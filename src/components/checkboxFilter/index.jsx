import React from 'react';
import PropTypes from 'prop-types';

import theme from 'styles/theme';

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
              <TickIcon $fillColor={theme.colors.white} />
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
  title: PropTypes.string.isRequired,
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      count: PropTypes.number.isRequired,
      checked: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
