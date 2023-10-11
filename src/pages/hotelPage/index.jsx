import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
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
import HotelRoom from 'components/hotelRoom';
import Review from 'components/review';
import Modal from 'components/modal';
import { useModal } from 'hooks/useModal';
import { setDate } from 'store/slices/inputsSlice';
import { getArrayOfDatesBetween } from 'utils/dateHelpers';
import updateHotel from 'api/updateHotel';

import {
  AvailableRoomsTitle,
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
  HotelReviewsContainer,
  HotelTitleWrapper,
  PriceStart,
  ReviewsContainer,
  ReviewsTitle,
  RoomsContainer,
  SuccessTitle,
  TimeValue,
} from './styled';

const DATE_FORMAT_PATTERN = 'd MMM y, iii';

export default function Hotel() {
  const hotel = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { from, to } = useSelector(state => state.inputs.dates);
  const [isOpen, onOpen, onClose] = useModal();
  const [isBookOpen, onBookOpen] = useModal();

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

  async function onBook(roomId) {
    const roomToUpdate = hotel.rooms.find(room => room.room_id === roomId);
    if (roomToUpdate) {
      roomToUpdate.booked_dates.push(
        ...getArrayOfDatesBetween(new Date(from), new Date(to)),
      );
      await updateHotel(hotel);
      onBookOpen();
    }
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
  const availableRooms = hotel.rooms.filter(
    room =>
      !room.booked_dates.find(
        date =>
          new Date(date) >= new Date(from) && new Date(date) <= new Date(to),
      ),
  );

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
      <RoomsContainer>
        <AvailableRoomsTitle>Available rooms</AvailableRoomsTitle>
        {availableRooms.map(room => (
          <HotelRoom
            key={room.room_id}
            room={room}
            hotelId={hotel.id}
            onBook={id => onBook(id)}
          />
        ))}
      </RoomsContainer>
      <HotelReviewsContainer>
        <ReviewsTitle>Reviews</ReviewsTitle>
        <ReviewsContainer>
          {hotel.rooms.map(room =>
            room.reviews.map(review => (
              <Review review={review} key={room.id + review.username} />
            )),
          )}
        </ReviewsContainer>
      </HotelReviewsContainer>

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

      {isBookOpen && (
        <Modal
          onClose={() => {
            navigate('/');
          }}
        >
          <SuccessTitle>You have successfully booked a hotel!</SuccessTitle>
        </Modal>
      )}
    </>
  );
}
