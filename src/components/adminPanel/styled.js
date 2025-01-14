import styled from 'styled-components';

import { ReactComponent as Delete } from 'assets/delete.svg';
import { ReactComponent as Edit } from 'assets/edit.svg';
import { ReactComponent as Show } from 'assets/eye.svg';
import { ReactComponent as ArrowIcon } from 'assets/arrow.svg';
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

const ActiveColumnHead = styled(PanelColumnHead)`
  position: relative;
  cursor: pointer;
`;

const Arrow = styled(ArrowIcon)`
  position: absolute;
  right: 10px;
  top: 15px;
  width: 20px;
  fill: ${({ theme }) => theme.mode.textColor};
  transform: ${({ $isAsc }) => ($isAsc ? 'rotate(180deg)' : 'rotate(0)')};
`;

const AddEntityButton = styled.button`
  padding: 8px;
  border-radius: 4px;
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

const ManagementContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 5px 10px;
  border: 1px solid black;
  border-radius: 12px;
  width: 105px;
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
  ManagementContainer,
  SearchInput,
  ActiveColumnHead,
  Arrow,
};
