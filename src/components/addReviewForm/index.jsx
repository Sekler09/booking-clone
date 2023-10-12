import React, { useState } from 'react';
import { arrayOf, func, number, shape, string } from 'prop-types';
import {
  Input,
  Label,
  RatingInput,
  ReviewForm,
  Select,
  SubmitButton,
} from './styled';

function AddReviewForm({ onReviewAdd, rooms, onClose }) {
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [roomId, setRoomId] = useState(rooms[0].room_id);

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
        placeholder="Enter your name"
        onChange={e => setUsername(e.target.value)}
      />
      <Label>
        Pick a room:
        <Select value={roomId} onChange={e => setRoomId(e.target.value)}>
          {rooms.map(room => (
            <option value={room.room_id} key={room.room_id}>
              {room.room_type}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        Rating (from 0 to 5):
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
        placeholder="Enter your feedback"
        onChange={e => setComment(e.target.value)}
      />
      <SubmitButton type="submit">Send</SubmitButton>
    </ReviewForm>
  );
}

AddReviewForm.propTypes = {
  onReviewAdd: func.isRequired,
  rooms: arrayOf(
    shape({
      room_id: number.isRequired,
      room_type: string.isRequired,
    }),
  ).isRequired,
  onClose: func.isRequired,
};

export default AddReviewForm;
