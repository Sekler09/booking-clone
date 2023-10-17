import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import HotelGallery from 'components/hotelGallery';
import HotelRoom from 'components/hotelRoom';
import Review from 'components/review';
import Modal from 'components/modal';
import DateRangePicker from 'components/dateRangePicker';
import AddReviewForm from 'components/addReviewForm';
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
  const { t } = useTranslation();
  const [isDateOpen, onDateOpen, onDateClose] = useModal();
  const [isBookOpen, onBookOpen] = useModal();
  const [isReviewOpen, onReviewOpen, onReviewClose] = useModal();

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
    const roomToUpdate = hotel.rooms.find(room => room.roomId === roomId);
    if (roomToUpdate) {
      roomToUpdate.bookedDates.push(
        ...getArrayOfDatesBetween(new Date(from), new Date(to)),
      );
      await updateHotel(hotel);
      onBookOpen();
    }
  }

  async function onReviewAdd(roomId, review) {
    const roomToUpdate = hotel.rooms.find(room => room.roomId === roomId);
    if (roomToUpdate) {
      roomToUpdate.reviews.push(review);
      await updateHotel(hotel);
      onReviewClose();
    }
  }

  const startPrice = Math.min(...hotel.rooms.map(room => room.pricePerNight));
  const checkinTime = 'From 14:00 to 00:00';
  const checkoutTime = 'Before 12:00';

  const selectedDays = {
    from: from ? new Date(from) : from,
    to: to ? new Date(to) : to,
  };

  const availableRooms = hotel.rooms.filter(
    room =>
      !room.bookedDates.find(
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
            {hotel.distanceFromCenter} {t('km')} {t('fromCenter')}
          </HotelDistanceFromTheCenter>
        </HotelTitleWrapper>
        <PriceStart>
          {t('priceFrom')} ${startPrice}
        </PriceStart>
      </HotelHeaderContainer>
      <HotelGallery hotel={hotel} />
      <DatesOfStayContainer>
        <DateOfStay>
          <DateTitle>{t('checkin')}</DateTitle>
          <DateAndTimeContainer>
            <DateValue onClick={onDateOpen}>
              {format(new Date(from), DATE_FORMAT_PATTERN)}
            </DateValue>
            <TimeValue>{checkinTime}</TimeValue>
          </DateAndTimeContainer>
        </DateOfStay>
        <DateOfStay>
          <DateTitle>{t('checkout')}</DateTitle>
          <DateAndTimeContainer>
            <DateValue onClick={onDateOpen}>
              {format(new Date(to), DATE_FORMAT_PATTERN)}
            </DateValue>
            <TimeValue>{checkoutTime}</TimeValue>
          </DateAndTimeContainer>
        </DateOfStay>
        <ChangeDateButton onClick={onDateOpen}>Change</ChangeDateButton>
      </DatesOfStayContainer>
      <RoomsContainer>
        <AvailableRoomsTitle>Available rooms</AvailableRoomsTitle>
        {availableRooms.map(room => (
          <HotelRoom
            key={room.roomId}
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
        <ChangeDateButton onClick={onReviewOpen}>Leave review</ChangeDateButton>
      </HotelReviewsContainer>

      {isDateOpen && (
        <Modal onClose={onDateClose}>
          <DateRangePicker
            selectedDays={selectedDays}
            onNewRange={newRange => onNewRange(newRange)}
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

      {isReviewOpen && (
        <Modal onClose={onReviewClose}>
          <AddReviewForm
            onReviewAdd={(id, rev) => onReviewAdd(id, rev)}
            rooms={hotel.rooms}
            onClose={onReviewClose}
          />
        </Modal>
      )}
    </>
  );
}
