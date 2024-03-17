import { styled } from 'styled-components';

const CountersWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 130%;
  right: 0;
  z-index: 5;
  gap: 4px;
  padding: 32px;
  border: 1px ${({ theme }) => theme.colors.black} solid;
  width: 120%;
  background-color: ${({ theme }) => theme.mode.appBg};
  color: ${({ theme }) => theme.mode.textColor};

  @media ${({ theme }) => `(max-width: ${theme.sizes[2]})`} {
    padding: 20px;
    width: 40%;
  }

  @media ${({ theme }) => `(max-width: ${theme.sizes[1]})`} {
    width: 80%;
  }
`;

const DoneButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px ${({ theme }) => theme.colors.trueBlue} solid;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 20px;
  width: 100%;
  background-color: ${({ theme }) => theme.mode.appBg};
  color: ${({ theme }) => theme.colors.trueBlue};
  text-transform: capitalize;
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlueGray};
  }
`;

export { CountersWrapper, DoneButton };
