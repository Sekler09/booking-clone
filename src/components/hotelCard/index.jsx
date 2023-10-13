import React from 'react';
import { number, string, shape, arrayOf } from 'prop-types';
import { useSearchParams } from 'react-router-dom';

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
  ReviewRatingText,
  Distance,
} from './styled';

function HotelCard({ hotel }) {
  const [searchParams] = useSearchParams();

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
  const startPrice = Math.min(...hotel.rooms.map(room => room.pricePerNight));

  const toUrl = `/hotels/${hotel.id}?${searchParams.toString()}`;

  return (
    <Card to={toUrl} data-cy="hotel-card">
      <HotelImage src={hotel.image} alt={hotel.name} />
      <ContentWrapper>
        <HotelInfoWrapper>
          <HotelMainInfoWrapper>
            <HotelName>{hotel.name}</HotelName>
            <HotelLocation>
              {hotel.city}, {hotel.address}
            </HotelLocation>
            <Price>from ${startPrice} per night</Price>
            <Distance>
              Distance from the center: {hotel.distanceFromCenter}km
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
      </ContentWrapper>
    </Card>
  );
}

HotelCard.propTypes = {
  hotel: shape({
    id: number.isRequired,
    name: string.isRequired,
    city: string.isRequired,
    address: string.isRequired,
    distanceFromCenter: number.isRequired,
    image: string.isRequired,
    rooms: arrayOf(
      shape({
        pricePerNight: number.isRequired,
        reviews: arrayOf(
          shape({
            rating: number.isRequired,
          }),
        ),
      }),
    ),
  }).isRequired,
};

export default HotelCard;
