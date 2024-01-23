import { arrayOf, node, string } from 'prop-types';

import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';

import {
  AddEntityButton,
  PanelColumnHead,
  PanelContainer,
  PanelHead,
} from './styled';

export default function AdminPanel({ children, addEntity, labels }) {
  const [isAddFormOpen, onAddFormOpen, onAddFormClose] = useModal();

  return (
    <>
      {addEntity && isAddFormOpen && (
        <Modal onClose={onAddFormClose}>{addEntity}</Modal>
      )}
      {addEntity && (
        <AddEntityButton onClick={onAddFormOpen}>Add Entity</AddEntityButton>
      )}

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
  children: node,
};

AdminPanel.defaultProps = {
  addEntity: null,
  children: null,
};
