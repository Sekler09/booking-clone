import React from 'react';
import { number, func, string, shape, arrayOf } from 'prop-types';

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
  return (
    <RoomContainer>
      <ImageContainer>
        <RoomImage src={Image} />
      </ImageContainer>
      <InfoContainer>
        <RoomName>{room.roomType}</RoomName>
        <RoomCapacity>{room.capacity} person</RoomCapacity>
        <RoomPrice>${room.pricePerNight}</RoomPrice>
      </InfoContainer>
      <BookButton onClick={() => onBook(room.roomId)}>Book now</BookButton>
    </RoomContainer>
  );
}

HotelRoom.propTypes = {
  room: shape({
    roomId: number,
    roomType: string,
    capacity: number,
    pricePerNight: number,
    bookedDates: arrayOf(string),
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