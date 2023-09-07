import React from 'react';
import PropTypes from 'prop-types';

import GrayMinus from 'assets/gray-minus.png';
import GrayPlus from 'assets/gray-plus.png';
import Minus from 'assets/minus.png';
import Plus from 'assets/plus.png';

import {
  ButtonsWrapper,
  CounterButton,
  CounterWrapper,
  CountValue,
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
          <img src={count === min ? GrayMinus : Minus} alt="" width="15px" />
        </CounterButton>
        <CountValue>{count}</CountValue>
        <CounterButton onClick={() => onIncrement()} disabled={count === max}>
          <img src={count === max ? GrayPlus : Plus} alt="" />
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
