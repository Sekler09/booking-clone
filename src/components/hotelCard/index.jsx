import React from 'react';
import { number, string, shape, arrayOf } from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const reviews = hotel.rooms.reduce(
    (allReviews, room) => allReviews.concat(room.reviews),
    [],
  );
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  function getRatingText(rating) {
    if (rating < 3.5) return t('reviewFilterTitle');
    if (rating < 4) return t('good');
    if (rating < 4.25) return t('veryGood');
    if (rating < 4.5) return t('fabulous');
    if (rating < 4.75) return t('superb');
    return t('exceptional');
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
            <Price>
              {t('priceFrom')} ${startPrice} {t('perNight')}{' '}
            </Price>
            <Distance>
              {t('distanceFilterTitle')}: {hotel.distanceFromCenter} {t('km')}
            </Distance>
          </HotelMainInfoWrapper>
          {!!reviews.length && (
            <ReviewsInfo>
              <ReviewTitle>
                <ReviewRatingText>{ratingText}</ReviewRatingText>
                <TotalReviews>
                  {t('reviews')}: {reviews.length}
                </TotalReviews>
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
