import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from 'assets/arrow.svg';

import { MainInput, MainInputWrapper } from './styled';

export default function MainFiltersInput({
  isOpen,
  onOpenClick,
  onCloseClick,
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
        onCloseClick();
      }
    }
    if (isOpen) {
      setTimeout(() => document.addEventListener('click', onClickOutside), 0);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [isOpen, onCloseClick]);

  return (
    <MainInputWrapper onClick={onOpenClick}>
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
  onOpenClick: PropTypes.func,
  onCloseClick: PropTypes.func,
};

MainFiltersInput.defaultProps = {
  children: undefined,
  isOpen: false,
  onOpenClick: () => {},
  onCloseClick: () => {},
  needArrow: false,
  isReadOnly: false,
  onValueChange: () => {},
  placeholder: '',
};
