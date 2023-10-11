import React from 'react';
import { number, func, string, shape, arrayOf } from 'prop-types';

import {
  BookButton,
  ImageAmount,
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
  return (
    <RoomContainer>
      <ImageContainer>
        <RoomImage src={Image} />
        <ImageAmount>{room.capacity} photo</ImageAmount>
      </ImageContainer>
      <InfoContainer>
        <RoomName>{room.room_type}</RoomName>
        <RoomCapacity>{room.capacity} person</RoomCapacity>
        <RoomPrice>${room.price_per_night}</RoomPrice>
      </InfoContainer>
      <BookButton onClick={() => onBook(room.room_id)}>Book now</BookButton>
    </RoomContainer>
  );
}

HotelRoom.propTypes = {
  room: shape({
    room_id: number,
    room_type: string,
    capacity: number,
    price_per_night: number,
    booked_dates: arrayOf(string),
    reviews: arrayOf(
      shape({
        username: string,
        rating: number,
        comment: string,
      }),
    ),
  }).isRequired,
  onBook: func.isRequired,
};

export default HotelRoom;
