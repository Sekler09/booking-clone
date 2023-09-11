import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Arrow } from 'assets/arrow.svg';

import { MainInput, MainInputWrapper } from './styled';

export default function MainFiltersInput({
  children,
  needModal,
  needArrow,
  inputValue,
  isReadOnly,
  onValueChange,
  Icon,
  placeholder,
}) {
  const [showModal, setShowModal] = useState(false);
  const calendarRef = useRef();
  useEffect(() => {
    function onClickOutside(event) {
      if (
        (calendarRef.current && !calendarRef.current.contains(event.target)) ||
        event.target.classList.contains('done-btn')
      ) {
        setShowModal(false);
      }
    }
    if (showModal) {
      setTimeout(() => document.addEventListener('click', onClickOutside), 0);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [showModal]);

  return (
    <MainInputWrapper onClick={needModal ? () => setShowModal(true) : () => {}}>
      <Icon />
      <MainInput
        value={inputValue}
        readOnly={isReadOnly}
        onChange={onValueChange}
        placeholder={placeholder}
      />
      {needArrow && <Arrow />}
      {showModal && <div ref={calendarRef}>{children}</div>}
    </MainInputWrapper>
  );
}

MainFiltersInput.propTypes = {
  needModal: PropTypes.bool,
  needArrow: PropTypes.bool,
  Icon: PropTypes.func.isRequired,
  children: PropTypes.node,
  inputValue: PropTypes.string.isRequired,
  isReadOnly: PropTypes.bool,
  onValueChange: PropTypes.func,
  placeholder: PropTypes.string,
};

MainFiltersInput.defaultProps = {
  children: undefined,
  needModal: false,
  needArrow: false,
  isReadOnly: false,
  onValueChange: () => {},
  placeholder: '',
};
