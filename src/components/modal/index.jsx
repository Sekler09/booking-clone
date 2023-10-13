import React, { useRef } from 'react';
import { func, node } from 'prop-types';

import { CloseButton, ModalContainer, ModalOverlay } from './styled';

function Modal({ onClose, children }) {
  const modalRef = useRef(null);

  function onOverlayClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }

  return (
    <ModalOverlay onClick={e => onOverlayClick(e)}>
      <ModalContainer ref={modalRef}>
        {children}
        <CloseButton type="button" onClick={onClose} />
      </ModalContainer>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  onClose: func.isRequired,
  children: node.isRequired,
};

export default Modal;
