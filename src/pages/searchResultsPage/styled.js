import styled from 'styled-components';

import { ReactComponent as Error } from 'assets/error.svg';
import { ReactComponent as Search } from 'assets/search.svg';

const ResultsWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 40px;

  @media ${({ theme }) => `(max-width: ${theme.sizes[1]})`} {
    flex-direction: column;
  }
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media ${({ theme }) => `(max-width: ${theme.sizes[1]})`} {
    width: auto;
  }
`;

const ResultsCountInfo = styled.div`
  font-size: large;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.mode.textColor};
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

const SearchCity = styled.span`
  text-transform: capitalize;
`;

export {
  SearchIcon,
  EmptyResult,
  ResultsWrapper,
  ResultsContainer,
  ResultsCountInfo,
  ErrorWrapper,
  ErrorIcon,
  SearchCity,
};
