import Arrow from 'assets/arrow.png';
import ManIcon from 'assets/man.png';
import React, { useEffect, useRef, useState } from 'react';

import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';
import Counter from '../counter';
import { CountersWrapper, DoneButton } from './styled';

export default function CountInput() {
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [showCounters, setShowCounters] = useState(false);

  const inputValue = `${adultsCount} adult${
    adultsCount > 1 ? 's' : ''
  } · ${childrenCount} children · ${roomsCount} room${
    roomsCount > 1 ? 's' : ''
  }`;

  const countersRef = useRef();

  useEffect(() => {
    const handleClickOutside = event => {
      if (countersRef.current && !countersRef.current.contains(event.target)) {
        setShowCounters(false);
      }
    };

    if (showCounters) {
      setTimeout(
        () => document.addEventListener('click', handleClickOutside),
        0,
      );
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showCounters, countersRef]);

  const handleInputClick = () => {
    setShowCounters(prevShow => !prevShow);
  };

  const handleCloseCounters = () => {
    setShowCounters(false);
  };

  return (
    <MainInputWrapper onClick={!showCounters ? handleInputClick : () => {}}>
      <MainInputImg src={ManIcon} alt="Human" />
      <MainInput type="text" readOnly value={inputValue} />
      <img src={Arrow} alt="Arrow" width="10px" />
      {showCounters && (
        <CountersWrapper ref={countersRef}>
          <Counter
            max={30}
            min={1}
            setCount={setAdultsCount}
            count={adultsCount}
            label="Adults"
          />
          <Counter
            max={10}
            min={0}
            setCount={setChildrenCount}
            count={childrenCount}
            label="Children"
          />
          <Counter
            max={30}
            min={1}
            setCount={setRoomsCount}
            count={roomsCount}
            label="Rooms"
          />
          <DoneButton onClick={handleCloseCounters}>Done</DoneButton>
        </CountersWrapper>
      )}
    </MainInputWrapper>
  );
}
