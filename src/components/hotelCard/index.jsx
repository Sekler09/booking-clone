import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  HotelImage,
  ContentWrapper,
  HotelInfoWrapper,
  HotelMainInfoWrapper,
  HotelName,
  HotelLocation,
  Price,
  ReviewsInfo,
  ReviewTitle,
  Rating,
  TotalReviews,
  BookButton,
  ReviewRatingText,
  Distance,
} from './styled';

function HotelCard({ hotel }) {
  const reviews = hotel.rooms.reduce(
    (allReviews, room) => allReviews.concat(room.reviews),
    [],
  );
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  function getRatingText(rating) {
    if (rating < 3.5) return 'Review score';
    if (rating < 4) return 'Good';
    if (rating < 4.25) return 'Very good';
    if (rating < 4.5) return 'Fabulous';
    if (rating < 4.75) return 'Superb';
    return 'Exceptional';
  }

  const ratingText = getRatingText(averageRating);

  return (
    <Card>
      <HotelImage src={hotel.image} alt={hotel.name} />
      <ContentWrapper>
        <HotelInfoWrapper>
          <HotelMainInfoWrapper>
            <HotelName>{hotel.name}</HotelName>
            <HotelLocation>
              {hotel.city}, {hotel.address}
            </HotelLocation>
            <Price>
              from ${Math.min(...hotel.rooms.map(room => room.price_per_night))}{' '}
              per night
            </Price>
            <Distance>
              Distance from the center: {hotel.distance_from_center}km
            </Distance>
          </HotelMainInfoWrapper>
          {!!reviews.length && (
            <ReviewsInfo>
              <ReviewTitle>
                <ReviewRatingText>{ratingText}</ReviewRatingText>
                <TotalReviews>{reviews.length} reviews</TotalReviews>
              </ReviewTitle>
              <Rating>{averageRating.toFixed(1)}</Rating>
            </ReviewsInfo>
          )}
        </HotelInfoWrapper>
        <BookButton to={`/hotels/${hotel.id}`}>Book Now</BookButton>
      </ContentWrapper>
    </Card>
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    distance_from_center: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        price_per_night: PropTypes.number.isRequired,
        reviews: PropTypes.arrayOf(
          PropTypes.shape({
            rating: PropTypes.number.isRequired,
          }),
        ),
      }),
    ),
  }).isRequired,
};

export default HotelCard;
