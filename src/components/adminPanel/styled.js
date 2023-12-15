import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PanelRow = styled.div`
  display: flex;
`;

const PanelCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px black solid;
  width: 180px;
`;

const PanelHead = styled(PanelRow)`
  background-color: ${({ theme }) => theme.colors.trueBlue};
`;

const PanelColumnHead = styled(PanelCell)`
  height: 50px;
`;

export { PanelColumnHead, PanelContainer, PanelHead, PanelCell, PanelRow };
