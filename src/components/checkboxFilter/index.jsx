import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

function CheckboxFilter({ title, labels, quantities, onChanges }) {
  return (
    <FilterContainer>
      <FilterTitle>{title}</FilterTitle>
      {labels.map((label, index) => (
        <div key={label}>
          <CheckboxLabel>
            <CheckboxInput type="checkbox" onChange={onChanges[index]} />
            {label} ({quantities[index]})
          </CheckboxLabel>
        </div>
      ))}
    </FilterContainer>
  );
}

CheckboxFilter.propTypes = {
  title: PropTypes.string.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  quantities: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChanges: PropTypes.arrayOf(PropTypes.func).isRequired,
};

export default CheckboxFilter;
