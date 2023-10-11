import React from 'react';
import { string, shape, number } from 'prop-types';

import {
  Profile,
  Rating,
  ReviewContainer,
  ReviewerName,
  Text,
  UserContainer,
} from './styled';

function Review({ review }) {
  const { username, comment, rating } = review;

  return (
    <ReviewContainer>
      <UserContainer>
        <Profile />
        <ReviewerName>{username}</ReviewerName>
        <Rating>{rating}</Rating>
      </UserContainer>
      <Text>{comment}</Text>
    </ReviewContainer>
  );
}

Review.propTypes = {
  review: shape({
    username: string.isRequired,
    comment: string.isRequired,
    rating: number.isRequired,
  }).isRequired,
};

export default Review;
