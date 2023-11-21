import React, { useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  ErrorMessage,
  Input,
  InputContainer,
  Label,
  RatingInput,
  ReviewForm,
  Select,
  SubmitButton,
} from './styled';

function AddReviewForm({ onReviewAdd, rooms, onClose }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [commentError, setCommentError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    let isError = false;
    if (comment.trim().length) {
      setCommentError(null);
    } else {
      setCommentError('Comment is required');
      isError = true;
    }

    if (!isError) {
      await onReviewAdd(+roomId, {
        rating,
        comment: comment.trim(),
      });
      onClose();
    }
  }

  return (
    <ReviewForm onSubmit={e => onSubmit(e)} data-cy="review-form">
      <Label>
        {t('pickRoom')}:
        <Select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          data-cy="review-room-select"
        >
          {rooms.map(room => (
            <option value={room.id} key={room.id}>
              {room.type}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        {t('rating')} (0 - 5):
        <RatingInput
          type="number"
          value={rating}
          min={0}
          step={0.1}
          max={5}
          onChange={e => setRating(e.target.value)}
          data-cy="review-rating-input"
        />
      </Label>
      <InputContainer>
        <Input
          type="text"
          value={comment}
          placeholder={t('commentInputPlaceholder')}
          onChange={e => setComment(e.target.value)}
          data-cy="review-comment-input"
        />
        {commentError && <ErrorMessage>{commentError}</ErrorMessage>}
      </InputContainer>
      <SubmitButton type="submit" data-cy="review-submit-btn">
        {t('reviewFormSubmit')}
      </SubmitButton>
    </ReviewForm>
  );
}

AddReviewForm.propTypes = {
  onReviewAdd: func.isRequired,
  rooms: arrayOf(
    shape({
      id: number.isRequired,
      type: string.isRequired,
    }),
  ).isRequired,
  onClose: func.isRequired,
};

export default AddReviewForm;
