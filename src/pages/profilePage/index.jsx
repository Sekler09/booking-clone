import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { differenceInDays, format } from 'date-fns';
import Loader from 'components/loader';
import Modal from 'components/modal';
import getUserBookings from 'api/getUserBookings';
import cancelBooking from 'api/cancelBooking';
import { useTranslation } from 'react-i18next';
import { DATE_FORMAT_PATTERN_EN, DATE_FORMAT_PATTERN_RU } from 'constants/date';
import { enUS, ru } from 'date-fns/locale';
import { useModal } from 'hooks/useModal';
import {
  BookingCard,
  BookingInfo,
  BookingsList,
  WarningButton,
  Button,
  PageTitle,
  WarnText,
  ChoiceButtonsContainer,
} from './styled';

function Profile() {
  const { t, i18n } = useTranslation();
  const user = useSelector(state => state.user.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, onOpen, onClose] = useModal();
  const [cancelId, setCancelId] = useState(null);
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (update) {
      setLoading(true);
      getUserBookings(user.id)
        .then(r => {
          if (!r.ok) {
            throw new Error('bad request');
          }
          return r.json();
        })
        .then(data => {
          setBookings(data);
          setError(null);
        })
        .catch(e => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
          setUpdate(false);
        });
    }
  }, [update]);

  const onBookingCancel = async () => {
    cancelBooking(user.id, cancelId).then(() => {
      onClose();
      setCancelId(null);
      setUpdate(true);
    });
  };

  const onCancelModalOpen = id => {
    onOpen();
    setCancelId(id);
  };

  if (error) {
    return 'Error occurred';
  }

  if (loading) {
    return <Loader />;
  }

  const locale = i18n.language === 'en' ? enUS : ru;
  const DATE_FORMAT_PATTERN =
    i18n.language === 'en' ? DATE_FORMAT_PATTERN_EN : DATE_FORMAT_PATTERN_RU;

  function getDatesRangeText(from, to) {
    return `${format(from, DATE_FORMAT_PATTERN, {
      locale,
    })} - ${format(to, DATE_FORMAT_PATTERN, { locale })}`;
  }

  return (
    <>
      <PageTitle>{t('activeBookings')}</PageTitle>
      <BookingsList>
        {bookings.map(booking => (
          <BookingCard key={booking.id}>
            <BookingInfo>
              <div>
                {t('Hotel')}: {booking.room.hotel.name},{' '}
                {booking.room.hotel.city}
              </div>
              <div>
                {t('Dates')}:{' '}
                {getDatesRangeText(
                  new Date(booking.startDate),
                  new Date(booking.endDate),
                )}
              </div>
              <div>
                {t('Price')}:{' '}
                {t('money', {
                  val:
                    booking.room.price *
                    differenceInDays(
                      new Date(booking.endDate),
                      new Date(booking.startDate),
                    ),
                })}
              </div>
            </BookingInfo>
            <WarningButton onClick={() => onCancelModalOpen(booking.id)}>
              {t('Cancel')}
            </WarningButton>
          </BookingCard>
        ))}
      </BookingsList>
      {isOpen && (
        <Modal onClose={onClose}>
          <WarnText>{t('SureToCancel')}</WarnText>
          <ChoiceButtonsContainer>
            <WarningButton onClick={onBookingCancel}>{t('Yes')}</WarningButton>
            <Button onClick={onClose}>{t('No')}</Button>
          </ChoiceButtonsContainer>
        </Modal>
      )}
    </>
  );
}

export default Profile;
