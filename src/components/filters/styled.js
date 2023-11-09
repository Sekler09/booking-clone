import styled from 'styled-components';

const FiltersWrapper = styled.div`
  border: 1px ${({ theme }) => theme.mode.elementsBorder} solid;
  border-radius: 8px;
  align-self: flex-start;
  width: 25%;
  background-color: ${({ theme }) => theme.mode.elementsBg};
  color: ${({ theme }) => theme.mode.textColor};

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
  border-top: 1px ${({ theme }) => theme.mode.elementsBorder} solid;

  &:has(> span) {
    display: none;
  }
`;

export { FiltersWrapper, FilterItem, FiltersTitle };
