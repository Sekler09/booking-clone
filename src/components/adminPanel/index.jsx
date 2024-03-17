import { arrayOf, bool, func, node, shape, string } from 'prop-types';

import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';

import { useEffect, useState } from 'react';
import {
  ActiveColumnHead,
  AddEntityButton,
  Arrow,
  ManagementContainer,
  PanelColumnHead,
  PanelContainer,
  PanelHead,
  SearchInput,
} from './styled';

export default function AdminPanel({
  children,
  addEntity,
  labels,
  onSearch,
  onSort,
}) {
  const [isAddFormOpen, onAddFormOpen, onAddFormClose] = useModal();
  const [sorting, setSorting] = useState({ field: 'id', order: 'asc' });

  const onSortingChange = field => {
    if (sorting.field === field) {
      if (sorting.order === 'asc') {
        setSorting({ field: 'id', order: 'asc' });
      } else {
        setSorting(prev => ({ ...prev, order: 'asc' }));
      }
    } else {
      setSorting({ field, order: 'desc' });
    }
  };

  useEffect(() => {
    onSort(`${sorting.field}.${sorting.order}`);
  }, [sorting]);

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
          {labels.map(({ label, sort }) =>
            !sort ? (
              <PanelColumnHead key={label}>{label}</PanelColumnHead>
            ) : (
              <ActiveColumnHead
                key={label}
                onClick={() => onSortingChange(label)}
              >
                {label}
                {sorting.field === label && (
                  <Arrow $isAsc={sorting.order === 'asc'} />
                )}
              </ActiveColumnHead>
            ),
          )}
        </PanelHead>
        {children}
      </PanelContainer>
    </>
  );
}

AdminPanel.propTypes = {
  addEntity: node,
  labels: arrayOf(
    shape({
      label: string,
      sort: bool,
    }),
  ).isRequired,
  onSearch: func,
  children: node,
  onSort: func.isRequired,
};

AdminPanel.defaultProps = {
  addEntity: null,
  children: null,
  onSearch: null,
};
