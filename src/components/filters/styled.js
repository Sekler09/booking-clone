import styled from 'styled-components';

import theme from 'styles/theme';

const FiltersWrapper = styled.div`
  border: 1px ${theme.colors.oldSilver} solid;
  border-radius: 8px;
  align-self: flex-start;
`;

const FiltersTitle = styled.p`
  font-weight: bold;
  font-size: xx-large;
`;

const FilterItem = styled.div`
  padding: 10px;
  border-top: 1px ${theme.colors.oldSilver} solid;
`;

export { FiltersWrapper, FilterItem, FiltersTitle };
