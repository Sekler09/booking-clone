import styled from 'styled-components';

import { ReactComponent as Delete } from 'assets/delete.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as Show } from 'assets/eye.svg';
import { ReactComponent as Url } from 'assets/url.svg';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  & > :nth-child(odd) {
    background-color: lightblue;
  }

  & > :first-child {
    background-color: ${({ theme }) => theme.colors.trueBlue};
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

const DeleteIcon = styled(Delete)`
  height: 30px;
  cursor: pointer;
`;

const EditIcon = styled(Edit)`
  height: 25px;
  cursor: pointer;
`;

const ShowIcon = styled(Show)`
  height: 30px;
  cursor: pointer;
`;

const LinkIcon = styled(Url)`
  height: 25px;
  cursor: pointer;
`;

export {
  PanelColumnHead,
  PanelContainer,
  PanelHead,
  PanelCell,
  PanelRow,
  AddEntityButton,
  DeleteIcon,
  EditIcon,
  ShowIcon,
  LinkIcon,
};
