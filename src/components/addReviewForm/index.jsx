import React, { useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  Input,
  Label,
  RatingInput,
  ReviewForm,
  Select,
  SubmitButton,
} from './styled';

function AddReviewForm({ onReviewAdd, rooms, onClose }) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [roomId, setRoomId] = useState(rooms[0].roomId);

  async function onSubmit(e) {
    e.preventDefault();
    if (username.trim() && comment.trim()) {
      await onReviewAdd(+roomId, {
        username: username.trim(),
        rating,
        comment: comment.trim(),
      });
      onClose();
    }
  }

  return (
    <ReviewForm onSubmit={e => onSubmit(e)}>
      <Input
        type="text"
        value={username}
        placeholder={t('usernameInputPlaceholder')}
        onChange={e => setUsername(e.target.value)}
      />
      <Label>
        {t('pickRoom')}:
        <Select value={roomId} onChange={e => setRoomId(e.target.value)}>
          {rooms.map(room => (
            <option value={room.roomId} key={room.roomId}>
              {room.roomType}
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
        />
      </Label>
      <Input
        type="text"
        value={comment}
        placeholder={t('commentInputPlaceholder')}
        onChange={e => setComment(e.target.value)}
      />
      <SubmitButton type="submit">{t('reviewFormSubmit')}</SubmitButton>
    </ReviewForm>
  );
}

AddReviewForm.propTypes = {
  onReviewAdd: func.isRequired,
  rooms: arrayOf(
    shape({
      roomId: number.isRequired,
      roomType: string.isRequired,
    }),
  ).isRequired,
  onClose: func.isRequired,
};

export default AddReviewForm;
