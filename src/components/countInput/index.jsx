import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ReactComponent as ManIcon } from 'assets/man.svg';

import { setAdults, setChildren, setRooms } from 'store/slices/inputsSlice';
import { useModal } from 'hooks/useModal';
import getInitCounterStateFormParamsAndRedux from 'utils/getInitCounterStateFormParamsAndRedux';
import Counter from '../counter';
import MainFiltersInput from '../common';

import { CountersWrapper, DoneButton } from './styled';

export default function CountInput() {
  const [isOpen, onOpenClick, onCloseClick] = useModal();

  const counts = useSelector(state => state.inputs.counts);
  const [searchParams, setSearchParams] = useSearchParams();
  const [adultsCount, setAdultsCount] = useState(
    getInitCounterStateFormParamsAndRedux(
      'adults',
      counts.adults,
      1,
      30,
      searchParams,
    ),
  );
  const [childrenCount, setChildrenCount] = useState(
    getInitCounterStateFormParamsAndRedux(
      'children',
      counts.children,
      0,
      10,
      searchParams,
    ),
  );
  const [roomsCount, setRoomsCount] = useState(
    getInitCounterStateFormParamsAndRedux(
      'rooms',
      counts.rooms,
      1,
      30,
      searchParams,
    ),
  );
  const dispatch = useDispatch();
  const inputValue = `${adultsCount} adult${
    adultsCount > 1 ? 's' : ''
  } · ${childrenCount} children · ${roomsCount} room${
    roomsCount > 1 ? 's' : ''
  }`;

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

  useEffect(() => {
    dispatch(setAdults(adultsCount));
    dispatch(setRooms(roomsCount));
    dispatch(setChildren(childrenCount));
  }, []);

  function onDoneClick(e) {
    e.stopPropagation();
    onCloseClick();
  }

  return (
    <MainFiltersInput
      isOpen={isOpen}
      onCloseClick={onCloseClick}
      onOpenClick={onOpenClick}
      needModal
      needArrow
      inputValue={inputValue}
      isReadOnly
      Icon={ManIcon}
    >
      <CountersWrapper>
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
        <DoneButton onClick={e => onDoneClick(e)}>Done</DoneButton>
      </CountersWrapper>
    </MainFiltersInput>
  );
}
