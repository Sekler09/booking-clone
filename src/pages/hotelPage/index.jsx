import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import HotelGallery from 'components/hotelGallery';
import HotelRoom from 'components/hotelRoom';
import Review from 'components/review';
import Modal from 'components/modal';
import DateRangePicker from 'components/dateRangePicker';
import AddReviewForm from 'components/addReviewForm';
import FancyLoader from 'components/loader';
import { useModal } from 'hooks/useModal';
import { setDate } from 'store/slices/inputsSlice';
import { getArrayOfDatesBetween } from 'utils/dateHelpers';
import updateHotel from 'api/updateHotel';
import getHotelById from 'api/getHotelById';

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { hotelId } = useParams();
  const {
    dates: { from, to },
    counts: { adults, children, rooms },
  } = useSelector(state => state.inputs);
  const { t, i18n } = useTranslation();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({
    from,
    to,
  });
  const [isDateOpen, onDateOpen, onDateClose] = useModal();
  const [isBookOpen, onBookOpen] = useModal();
  const [isReviewOpen, onReviewOpen, onReviewClose] = useModal();

  useEffect(() => {
    getHotelById(hotelId, { from, to, children, adults, rooms })
      .then(r => {
        if (!r.ok) {
          navigate('/');
        }
        return r.json();
      })
      .then(data => {
        setHotel(data);
        setLoading(false);
      });
  }, [from, to]);

  function onNewRange(newRange) {
    if (!newRange) {
      setDates({ from: null, to: null });
      return;
    }
    const newDate = {
      from: newRange.from ? format(newRange.from, 'y-M-d') : null,
      to: newRange.to ? format(newRange.to, 'y-M-d') : null,
    };
    setDates(newDate);
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

  function onDateModalClose() {
    dispatch(setDate(dates));
    onDateClose();
  }

  const startPrice =
    hotel && Math.min(...hotel.rooms.map(room => room.pricePerNight));
  const checkinTime = `${t('checkinFrom')} 14:00 ${t('checkinTo')} 00:00`;
  const checkoutTime = `${t('checkoutBefore')} 12:00`;

  const selectedDays = {
    from: dates.from ? new Date(dates.from) : dates.from,
    to: dates.to ? new Date(dates.to) : dates.to,
  };

  const locale = i18n.language === 'en' ? enUS : ru;
  return (
    <>
      {loading && <FancyLoader />}
      {!loading && hotel && (
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
            {!!hotel.rooms.length && (
              <PriceStart>
                {t('priceFrom')} ${startPrice}
              </PriceStart>
            )}
          </HotelHeaderContainer>
          <HotelGallery hotel={hotel} />
          <DatesOfStayContainer>
            <DateOfStay>
              <DateTitle>{t('checkin')}</DateTitle>
              <DateAndTimeContainer>
                <DateValue onClick={onDateOpen}>
                  {format(new Date(from), DATE_FORMAT_PATTERN, { locale })}
                </DateValue>
                <TimeValue>{checkinTime}</TimeValue>
              </DateAndTimeContainer>
            </DateOfStay>
            <DateOfStay>
              <DateTitle>{t('checkout')}</DateTitle>
              <DateAndTimeContainer>
                <DateValue onClick={onDateOpen}>
                  {format(new Date(to), DATE_FORMAT_PATTERN, { locale })}
                </DateValue>
                <TimeValue>{checkoutTime}</TimeValue>
              </DateAndTimeContainer>
            </DateOfStay>
            <ChangeDateButton onClick={onDateOpen}>
              {t('dateChange')}
            </ChangeDateButton>
          </DatesOfStayContainer>
          <RoomsContainer>
            <AvailableRoomsTitle>
              {t('availableRoomsTitle')}
            </AvailableRoomsTitle>
            {hotel.rooms.map(room => (
              <HotelRoom
                key={room.id}
                room={room}
                hotelId={hotel.id}
                onBook={id => onBook(id)}
              />
            ))}
            {!hotel.rooms.length && <p>No rooms are available in this dates</p>}
          </RoomsContainer>
          <HotelReviewsContainer>
            <ReviewsTitle>{t('reviewsTitle')}</ReviewsTitle>
            <ReviewsContainer>
              {hotel.reviews.map(review => (
                <Review review={review} key={review.id} />
              ))}
            </ReviewsContainer>
            <ChangeDateButton onClick={onReviewOpen}>
              {t('leaveReview')}
            </ChangeDateButton>
          </HotelReviewsContainer>
        </>
      )}

      {isDateOpen && (
        <Modal onClose={() => onDateModalClose()}>
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
          <SuccessTitle>{t('successBookText')}</SuccessTitle>
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
