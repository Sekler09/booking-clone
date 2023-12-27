import { arrayOf, node, number, shape } from 'prop-types';

import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';

import {
  PanelCell,
  PanelColumnHead,
  PanelContainer,
  PanelHead,
  PanelRow,
} from './styled';

export default function AdminPanel({ data, addEntity }) {
  const [isAddFormOpen, onAddFormOpen, onAddFormClose] = useModal();

  return (
    <>
      {addEntity && isAddFormOpen && (
        <Modal onClose={onAddFormClose}>{addEntity}</Modal>
      )}
      {addEntity && (
        <button type="button" onClick={onAddFormOpen}>
          Add Entity
        </button>
      )}

      <PanelContainer>
        {(!data || !data.length) && 'No entities exist'}
        {data && !!data.length && (
          <>
            <PanelHead>
              {Object.keys(data[0]).map(key => (
                <PanelColumnHead key={key}>{key}</PanelColumnHead>
              ))}
            </PanelHead>
            {data.map(item => (
              <PanelRow key={item.id}>
                {Object.entries(item).map(([key, value]) => {
                  return (
                    <PanelCell key={key}>
                      <p>{value}</p>
                    </PanelCell>
                  );
                })}
              </PanelRow>
            ))}
          </>
        )}
      </PanelContainer>
    </>
  );
}

AdminPanel.propTypes = {
  data: arrayOf(
    shape({
      id: number.isRequired,
    }),
  ).isRequired,
  addEntity: node.isRequired,
};
