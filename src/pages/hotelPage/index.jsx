import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { useSocket } from 'hooks/useSocket';
import { setDate } from 'store/slices/inputsSlice';
import getHotelById from 'api/getHotelById';
import bookHotelRoom from 'api/bookHotelRoom';
import postReview from 'api/postReview';

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
  const location = useLocation();
  const dispatch = useDispatch();
  const { hotelId } = useParams();
  const {
    dates: { from, to },
    counts: { adults, children, rooms },
  } = useSelector(state => state.inputs);
  const isLoggedIn = useSelector(state => !!state.user.user);
  const { t, i18n } = useTranslation();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({
    from,
    to,
  });
  const [bookedRooms, setBookedRoms] = useState([]);
  const [bookPayload, setBookPayload] = useState(null);

  const [isDateOpen, onDateOpen, onDateClose] = useModal();
  const [isBookOpen, onBookOpen] = useModal();
  const [isReviewOpen, onReviewOpen, onReviewClose] = useModal();

  const { emitBook } = useSocket(setBookPayload);

  useEffect(() => {
    if (!bookPayload) return;
    if (hotel.rooms.find(room => room.id === bookPayload.roomId)) {
      if (
        (new Date(bookPayload.dates.from) <= new Date(dates.to) &&
          new Date(bookPayload.dates.from) >= new Date(dates.from)) ||
        (new Date(bookPayload.dates.to) <= new Date(dates.to) &&
          new Date(bookPayload.dates.to) >= new Date(dates.from))
      ) {
        setBookedRoms(prev => [...prev, bookPayload.roomId]);
      }
    }
  }, [bookPayload]);

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
    if (!isLoggedIn) {
      navigate('/signin', {
        state: { prev: location.pathname + location.search },
      });
    }
    await bookHotelRoom(hotel.id, roomId, { from, to }).then(r => {
      if (r.ok) {
        onBookOpen();
        emitBook({
          roomId,
          dates: { from, to },
        });
      }
    });
  }

  async function onReviewAdd(roomId, review) {
    await postReview(hotel.id, roomId, review).then(r => {
      if (r.ok) {
        navigate(0);
      }
    });
  }

  function onDateModalClose() {
    dispatch(setDate(dates));
    onDateClose();
  }

  function onReviewModalOpen() {
    if (!isLoggedIn) {
      navigate('/signin', {
        state: { prev: location.pathname + location.search },
      });
    }
    onReviewOpen();
  }

  const startPrice = hotel && Math.min(...hotel.rooms.map(room => room.price));
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
              <HotelAddress
                to={`https://www.google.com/maps/search/${[
                  hotel.city,
                  hotel.address,
                ]
                  .join(' ')
                  .replaceAll(' ', '+')}`}
                target="_blank"
              >
                {hotel.city}, {hotel.address}
              </HotelAddress>
              <HotelDistanceFromTheCenter>
                {hotel.distance} {t('km')} {t('fromCenter')}
              </HotelDistanceFromTheCenter>
            </HotelTitleWrapper>
            {!!hotel.rooms.length && (
              <PriceStart>
                {t('priceFrom')} {t('money', { val: startPrice })}
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
                isBooked={!!bookedRooms.find(id => id === room.id)}
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
            <ChangeDateButton onClick={() => onReviewModalOpen()}>
              {isLoggedIn ? t('leaveReview') : t('signInToReview')}
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
            navigate(0);
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
