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

const EMAIL_POSTFIX_REGEX = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function Review({ review }) {
  const { user, comment, rating } = review;

  return (
    <ReviewContainer>
      <UserContainer>
        <Profile />
        <ReviewerName>
          {user.email.replace(EMAIL_POSTFIX_REGEX, '')}
        </ReviewerName>
        <Rating>{rating}</Rating>
      </UserContainer>
      <Text>{comment}</Text>
    </ReviewContainer>
  );
}

Review.propTypes = {
  review: shape({
    user: shape({
      id: number.isRequired,
      email: string.isRequired,
    }),
    comment: string.isRequired,
    rating: number.isRequired,
  }).isRequired,
};

export default Review;
