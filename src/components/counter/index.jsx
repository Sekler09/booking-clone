import React from 'react';
import PropTypes from 'prop-types';

import {
  ButtonsWrapper,
  CounterButton,
  CounterWrapper,
  CountValue,
  StyledMinus,
  StyledPlus,
} from './styled';

export default function Counter({ label, count, setCount, min, max }) {
  function onIncrement() {
    setCount(count + 1);
  }

  function onDecrement() {
    setCount(count - 1);
  }

  return (
    <CounterWrapper>
      {label}
      <ButtonsWrapper>
        <CounterButton onClick={() => onDecrement()} disabled={count === min}>
          <StyledMinus $active={count !== min} />
        </CounterButton>
        <CountValue>{count}</CountValue>
        <CounterButton onClick={() => onIncrement()} disabled={count === max}>
          <StyledPlus $active={count !== max} />
        </CounterButton>
      </ButtonsWrapper>
    </CounterWrapper>
  );
}

Counter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
