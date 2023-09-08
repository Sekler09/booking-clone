import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { ReactComponent as ManIcon } from 'assets/man.svg';

import { setAdults, setChildren, setRooms } from 'store/slices/inputsSlice';
import Counter from '../counter';
import { CountersWrapper, DoneButton } from './styled';
import { MainInput, MainInputWrapper } from '../common/styled';

export default function CountInput() {
  const counts = useSelector(state => state.inputs.counts);
  function checkSearchValidity(searchCount, minValue, maxValue) {
    return searchCount
      ? searchCount >= minValue && searchCount <= maxValue
      : false;
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const [adultsCount, setAdultsCount] = useState(() => {
    const searchAdults = searchParams.get('adults');
    return checkSearchValidity(searchAdults, 1, 30)
      ? searchAdults
      : counts.adults;
  });
  const [childrenCount, setChildrenCount] = useState(() => {
    const searchChildren = searchParams.get('children');
    return checkSearchValidity(searchChildren, 0, 10)
      ? searchChildren
      : counts.children;
  });
  const [roomsCount, setRoomsCount] = useState(() => {
    const searchRooms = searchParams.get('rooms');
    return checkSearchValidity(searchRooms, 1, 30) ? searchRooms : counts.rooms;
  });
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
    if (value !== 0) {
      searchParams.set('children', value);
    } else {
      searchParams.delete('children');
    }
    setSearchParams(searchParams);
  }

  function updateAdults(value) {
    setAdultsCount(value);
    dispatch(setAdults(value));
    if (value !== 1) {
      searchParams.set('adults', value);
    } else {
      searchParams.delete('adults');
    }
    setSearchParams(searchParams);
  }

  function updateRooms(value) {
    setRoomsCount(value);
    dispatch(setRooms(value));
    if (value !== 1) {
      searchParams.set('rooms', value);
    } else {
      searchParams.delete('rooms');
    }
    setSearchParams(searchParams);
  }

  return (
    <MainInputWrapper onClick={!showCounters ? onInputClick : () => {}}>
      <ManIcon />
      <MainInput type="text" readOnly value={inputValue} />
      <Arrow />
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
