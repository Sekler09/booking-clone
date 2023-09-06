import GrayMinus from 'assets/gray-minus.png';
import GrayPlus from 'assets/gray-plus.png';
import Minus from 'assets/minus.png';
import Plus from 'assets/plus.png';
import PropTypes from 'prop-types';
import React from 'react';

import {
  ButtonsWrapper,
  CounterButton,
  CounterWrapper,
  CountValue,
} from './styled';

export default function Counter({ label, count, setCount, min, max }) {
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };
  const handleDecrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <CounterWrapper>
      {label}
      <ButtonsWrapper>
        <CounterButton onClick={handleDecrement} disabled={count === min}>
          <img
            src={count === min ? GrayMinus : Minus}
            alt="Minus"
            width="15px"
          />
        </CounterButton>
        <CountValue>{count}</CountValue>
        <CounterButton onClick={handleIncrement} disabled={count === max}>
          <img src={count === max ? GrayPlus : Plus} alt="Plus" />
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
