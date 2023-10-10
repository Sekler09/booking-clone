import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DayPicker } from 'react-day-picker';
import {
  addDays,
  addYears,
  endOfYear,
  format,
  startOfMonth,
  startOfToday,
} from 'date-fns';

import HotelGallery from 'components/hotelGallery';
import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';
import { setDate } from 'store/slices/inputsSlice';

import {
  ChangeDateButton,
  DateAndTimeContainer,
  DateOfStay,
  DateTitle,
  DateValue,
  DatesOfStayContainer,
  HotelAddress,
  HotelDistanceFromTheCenter,
  HotelHeaderContainer,
  HotelName,
  HotelTitleWrapper,
  PriceStart,
  TimeValue,
} from './styled';

const DATE_FORMAT_PATTERN = 'd MMM y, iii';

export default function Hotel() {
  const hotel = useLoaderData();
  const dispatch = useDispatch();
  const { from, to } = useSelector(state => state.inputs.dates);
  const [isOpen, onOpen, onClose] = useModal();

  function onNewRange(newRange) {
    if (!newRange) {
      dispatch(setDate({ from: null, to: null }));
      return;
    }
    const newDate = {
      from: newRange.from ? format(newRange.from, 'y-M-d') : null,
      to: newRange.to ? format(newRange.to, 'y-M-d') : null,
    };
    dispatch(setDate(newDate));
  }

  const startPrice = Math.min(...hotel.rooms.map(room => room.price_per_night));
  const checkinTime = 'From 14:00 to 00:00';
  const checkoutTime = 'Before 12:00';

  const selectedDays = {
    from: from ? new Date(from) : from,
    to: to ? new Date(to) : to,
  };

  const today = startOfToday();
  const disabledDays = [
    {
      from: startOfMonth(today),
      to: addDays(today, -1),
    },
  ];

  return (
    <>
      <HotelHeaderContainer>
        <HotelTitleWrapper>
          <HotelName>{hotel.name}</HotelName>
          <HotelAddress>
            {hotel.city}, {hotel.address}
          </HotelAddress>
          <HotelDistanceFromTheCenter>
            {hotel.distance_from_center}km from the center
          </HotelDistanceFromTheCenter>
        </HotelTitleWrapper>
        <PriceStart>from ${startPrice}</PriceStart>
      </HotelHeaderContainer>
      <HotelGallery hotel={hotel} />
      <DatesOfStayContainer>
        <DateOfStay>
          <DateTitle>Check-in</DateTitle>
          <DateAndTimeContainer>
            <DateValue onClick={onOpen}>
              {format(new Date(from), DATE_FORMAT_PATTERN)}
            </DateValue>
            <TimeValue>{checkinTime}</TimeValue>
          </DateAndTimeContainer>
        </DateOfStay>
        <DateOfStay>
          <DateTitle>Check-out</DateTitle>
          <DateAndTimeContainer>
            <DateValue onClick={onOpen}>
              {format(new Date(to), DATE_FORMAT_PATTERN)}
            </DateValue>
            <TimeValue>{checkoutTime}</TimeValue>
          </DateAndTimeContainer>
        </DateOfStay>
        <ChangeDateButton onClick={onOpen}>Change</ChangeDateButton>
      </DatesOfStayContainer>
      {isOpen && (
        <Modal onClose={onClose}>
          <DayPicker
            style={{ color: 'black' }}
            mode="range"
            fromMonth={today}
            toMonth={endOfYear(addYears(today, 1))}
            defaultMonth={today}
            numberOfMonths={2}
            disabled={disabledDays}
            weekStartsOn={1}
            selected={selectedDays}
            onSelect={newRange => onNewRange(newRange)}
            fixedWeeks
          />
        </Modal>
      )}
    </>
  );
}
