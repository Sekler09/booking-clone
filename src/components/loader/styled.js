import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  border: 6px solid ${({ theme }) => theme.colors.lightBlueGray};
  border-top: 6px solid ${({ theme }) => theme.colors.trueBlue};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

export { LoaderContainer, Loader };
