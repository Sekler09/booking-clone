import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  & > :nth-child(odd) {
    background-color: lightblue;
  }
`;

const PanelRow = styled.div`
  display: flex;
  width: 100%;
`;

const PanelCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  border: 1px black solid;
  padding: 5px 10px;
  word-break: break-all;
`;

const PanelHead = styled(PanelRow)`
  background-color: ${({ theme }) => theme.colors.trueBlue} !important;
  font-weight: 700;
`;

const PanelColumnHead = styled(PanelCell)`
  padding: 15px;
`;

const AddEntityButton = styled.button`
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.trueBlue};
  font-size: medium;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export {
  PanelColumnHead,
  PanelContainer,
  PanelHead,
  PanelCell,
  PanelRow,
  AddEntityButton,
};
