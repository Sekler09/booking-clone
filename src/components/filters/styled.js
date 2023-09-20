import styled from 'styled-components';

import theme from 'styles/theme';

const FiltersWrapper = styled.div`
  border: 1px ${theme.colors.oldSilver} solid;
  border-radius: 8px;
  align-self: flex-start;

  h3 {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

const FiltersTitle = styled.p`
  padding: 10px;
  font-weight: bold;
  font-size: x-large;
`;

const FilterItem = styled.div`
  padding: 10px;
  border-top: 1px ${theme.colors.oldSilver} solid;
`;

export { FiltersWrapper, FilterItem, FiltersTitle };
