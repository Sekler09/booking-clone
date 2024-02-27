import { arrayOf, func, node, string } from 'prop-types';

import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';

import {
  AddEntityButton,
  ManagementContainer,
  PanelColumnHead,
  PanelContainer,
  PanelHead,
  SearchInput,
} from './styled';

export default function AdminPanel({ children, addEntity, labels, onSearch }) {
  const [isAddFormOpen, onAddFormOpen, onAddFormClose] = useModal();

  return (
    <>
      {addEntity && isAddFormOpen && (
        <Modal onClose={onAddFormClose}>{addEntity}</Modal>
      )}
      <ManagementContainer>
        {addEntity && (
          <AddEntityButton onClick={onAddFormOpen}>Add Entity</AddEntityButton>
        )}

        {onSearch && (
          <SearchInput type="text" onChange={e => onSearch(e.target.value)} />
        )}
      </ManagementContainer>

      <PanelContainer>
        <PanelHead>
          {labels.map(key => (
            <PanelColumnHead key={key}>{key}</PanelColumnHead>
          ))}
        </PanelHead>
        {children}
      </PanelContainer>
    </>
  );
}

AdminPanel.propTypes = {
  addEntity: node,
  labels: arrayOf(string).isRequired,
  onSearch: func,
  children: node,
};

AdminPanel.defaultProps = {
  addEntity: null,
  children: null,
  onSearch: null,
};
