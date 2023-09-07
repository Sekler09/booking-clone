import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Arrow from 'assets/arrow.png';
import ManIcon from 'assets/man.png';

import { setAdults, setChildren, setRooms } from 'store/slices/inputsSlice';
import Counter from '../counter';
import { CountersWrapper, DoneButton } from './styled';
import { MainInput, MainInputImg, MainInputWrapper } from '../common/styled';

export default function CountInput() {
  const counts = useSelector(state => state.inputs.counts);
  const [adultsCount, setAdultsCount] = useState(counts.adults);
  const [childrenCount, setChildrenCount] = useState(counts.children);
  const [roomsCount, setRoomsCount] = useState(counts.rooms);
  const [showCounters, setShowCounters] = useState(false);
  const dispatch = useDispatch();
  const inputValue = `${adultsCount} adult${
    adultsCount > 1 ? 's' : ''
  } · ${childrenCount} children · ${roomsCount} room${
    roomsCount > 1 ? 's' : ''
  }`;

  const countersRef = useRef();
  useEffect(() => {
    function onClickOutside(event) {
      if (countersRef.current && !countersRef.current.contains(event.target)) {
        setShowCounters(false);
      }
    }

    if (showCounters) {
      setTimeout(() => document.addEventListener('click', onClickOutside), 0);
    }
    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [showCounters, countersRef]);

  function onInputClick() {
    setShowCounters(prevShow => !prevShow);
  }

  function onCloseCounters() {
    setShowCounters(false);
  }

  function updateChildren(value) {
    setChildrenCount(value);
    dispatch(setChildren(value));
  }

  function updateAdults(value) {
    setAdultsCount(value);
    dispatch(setAdults(value));
  }

  function updateRooms(value) {
    setRoomsCount(value);
    dispatch(setRooms(value));
  }

  return (
    <MainInputWrapper onClick={!showCounters ? onInputClick : () => {}}>
      <MainInputImg src={ManIcon} alt="" />
      <MainInput type="text" readOnly value={inputValue} />
      <img src={Arrow} alt="" width="10px" />
      {showCounters && (
        <CountersWrapper ref={countersRef}>
          <Counter
            max={30}
            min={1}
            setCount={count => updateAdults(count)}
            count={adultsCount}
            label="Adults"
          />
          <Counter
            max={10}
            min={0}
            setCount={count => updateChildren(count)}
            count={childrenCount}
            label="Children"
          />
          <Counter
            max={30}
            min={1}
            setCount={count => updateRooms(count)}
            count={roomsCount}
            label="Rooms"
          />
          <DoneButton onClick={() => onCloseCounters()}>Done</DoneButton>
        </CountersWrapper>
      )}
    </MainInputWrapper>
  );
}
