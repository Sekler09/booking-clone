import React from 'react';
import { number, func, string, shape, arrayOf } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
  BookButton,
  ImageContainer,
  InfoContainer,
  RoomCapacity,
  RoomContainer,
  RoomImage,
  RoomName,
  RoomPrice,
} from './styled';

const Image = 'https://placehold.co/600x400';

function HotelRoom({ room, onBook }) {
  const { t } = useTranslation();
  const isLoggedIn = useSelector(state => !!state.user.user);

  return (
    <RoomContainer>
      <ImageContainer>
        <RoomImage src={Image} />
      </ImageContainer>
      <InfoContainer>
        <RoomName data-cy="hotel-room-type">{room.type}</RoomName>
        <RoomCapacity data-cy="hotel-room-capacity">
          {room.capacity} {t(`person${room.capacity > 1 ? 's' : ''}`)}
        </RoomCapacity>
        <RoomPrice data-cy="hotel-room-price">${room.price}</RoomPrice>
      </InfoContainer>
      <BookButton onClick={() => onBook(room.id)} data-cy="hotel-room-book">
        {isLoggedIn ? t('bookNow') : t('signInToBook')}
      </BookButton>
    </RoomContainer>
  );
}

HotelRoom.propTypes = {
  room: shape({
    id: number,
    type: string,
    capacity: number,
    price: number,
    bookedDates: arrayOf(string),
  }).isRequired,
  onBook: func.isRequired,
};

export default HotelRoom;
