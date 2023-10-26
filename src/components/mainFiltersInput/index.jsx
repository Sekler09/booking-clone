import React, { useEffect, useRef } from 'react';
import { bool, string, func, node } from 'prop-types';

import { MainInput, MainInputWrapper, Arrow } from './styled';

export default function MainFiltersInput({
  isOpen,
  onOpen,
  onClose,
  children,
  needArrow,
  inputValue,
  isReadOnly,
  onValueChange,
  Icon,
  placeholder,
}) {
  const popoverRef = useRef();
  useEffect(() => {
    function onClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      setTimeout(() => document.addEventListener('click', onClickOutside), 0);
    }

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [isOpen]);

  return (
    <MainInputWrapper onClick={onOpen}>
      {Icon}
      <MainInput
        value={inputValue}
        readOnly={isReadOnly}
        onChange={onValueChange}
        placeholder={placeholder}
        data-cy="main-input"
      />
      {needArrow && <Arrow data-cy="main-input-arrow" />}
      {isOpen && children && (
        <div ref={popoverRef} data-cy="main-input-modal">
          {children}
        </div>
      )}
    </MainInputWrapper>
  );
}

MainFiltersInput.propTypes = {
  needArrow: bool,
  Icon: node,
  children: node,
  inputValue: string.isRequired,
  isReadOnly: bool,
  onValueChange: func,
  placeholder: string,
  isOpen: bool,
  onOpen: func,
  onClose: func,
};

MainFiltersInput.defaultProps = {
  children: null,
  Icon: null,
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  needArrow: false,
  isReadOnly: false,
  onValueChange: () => {},
  placeholder: '',
};
