import styled from 'styled-components';

import { ReactComponent as Error } from 'assets/error.svg';
import { ReactComponent as Search } from 'assets/search.svg';

const ResultsWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

const ResultsCountInfo = styled.div`
  font-size: large;
  margin-bottom: 10px;
`;

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  margin: auto;
  padding: 8px;
  width: fit-content;
  background-color: #dd2d4a;
  color: white;
`;

const ErrorIcon = styled(Error)`
  fill: ${({ theme }) => theme.colors.white};
  width: 30px;
`;

const EmptyResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin: auto;

  p:first-of-type {
    font-size: x-large;
    font-weight: bold;
  }
`;

const SearchIcon = styled(Search)`
  fill: ${({ theme }) => theme.colors.black};
  width: 50px;
`;

export {
  SearchIcon,
  EmptyResult,
  ResultsWrapper,
  ResultsContainer,
  ResultsCountInfo,
  ErrorWrapper,
  ErrorIcon,
};
