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

  @media ${({ theme }) => `(max-width: ${theme.sizes[0]})`} {
    padding: 20px;
    width: 40%;
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
  color: ${({ theme }) => theme.colors.trueBlue};
  background-color: ${({ theme }) => theme.mode.appBg};
  line-height: 20px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightBlueGray};
  }
`;

export { CountersWrapper, DoneButton };
