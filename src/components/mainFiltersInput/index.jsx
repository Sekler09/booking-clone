import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from 'assets/arrow.svg';

import { MainInput, MainInputWrapper } from './styled';

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
      <Icon />
      <MainInput
        value={inputValue}
        readOnly={isReadOnly}
        onChange={onValueChange}
        placeholder={placeholder}
      />
      {needArrow && <Arrow />}
      {isOpen && <div ref={popoverRef}>{children}</div>}
    </MainInputWrapper>
  );
}

MainFiltersInput.propTypes = {
  needArrow: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
  children: PropTypes.node,
  inputValue: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

MainFiltersInput.defaultProps = {
  children: null,
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  needArrow: false,
  isReadOnly: false,
  onValueChange: () => {},
  placeholder: '',
};
