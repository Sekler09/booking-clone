import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20%;
`;

const Loader = styled.div`
  border: 6px solid rgb(0 108 228/ 6%);
  border-top: 6px solid #006ce4;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

export { LoaderContainer, Loader };
