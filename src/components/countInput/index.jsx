import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Counter from 'components/counter';
import MainFiltersInput from 'components/mainFiltersInput';
import { useModal } from 'hooks/useModal';
import { setAdults, setChildren, setRooms } from 'store/slices/inputsSlice';
import { checkSearchCountValidity } from 'utils/urlHelpers';

import { ReactComponent as ManIcon } from 'assets/man.svg';
import { CountersWrapper, DoneButton } from './styled';

export default function CountInput() {
  const [isOpen, onOpen, onClose] = useModal();
  const dispatch = useDispatch();
  const counts = useSelector(state => state.inputs.counts);
  const [searchParams, setSearchParams] = useSearchParams();

  const [adultsCount, setAdultsCount] = useState(1);

  const [childrenCount, setChildrenCount] = useState(0);

  const [roomsCount, setRoomsCount] = useState(1);

  useEffect(() => {
    const searchAdults = +searchParams.get('adults');
    const adults = checkSearchCountValidity(searchAdults, 1, 30)
      ? searchAdults
      : counts.adults;

    const searchChildren = +searchParams.get('children');
    const children = checkSearchCountValidity(searchChildren, 0, 10)
      ? searchChildren
      : counts.children;

    const searchRooms = +searchParams.get('rooms');
    const rooms = checkSearchCountValidity(searchRooms, 1, 30)
      ? searchRooms
      : counts.rooms;

    setAdultsCount(adults);
    setChildrenCount(children);
    setRoomsCount(rooms);
  }, []);

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
    console.log(value);
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

  function onDoneClick(e) {
    e.stopPropagation();
    onClose();
  }

  function getInputValue() {
    return `${adultsCount} adult${
      adultsCount > 1 ? 's' : ''
    } · ${childrenCount} children · ${roomsCount} room${
      roomsCount > 1 ? 's' : ''
    }`;
  }

  const inputValue = getInputValue();

  return (
    <MainFiltersInput
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
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
