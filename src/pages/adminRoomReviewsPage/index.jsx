import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminPanel from 'components/adminPanel';
import Loader from 'components/loader';
import deleteReview from 'api/deleteReview';
import getRoomReviews from 'api/getRoomReviews';

export default function AdminRoomReviewsPage() {
  const { hotelId, roomId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRoomReviews(hotelId, roomId)
      .then(r => {
        if (!r.ok) {
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(data => {
        setReviews(data);
        setIsLoading(false);
        setError(null);
      })
      .catch(e => {
        setIsLoading(false);
        setError(e);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  async function onReviewDelete(id) {
    await deleteReview(hotelId, roomId, id).then(() =>
      window.location.reload(),
    );
  }

  const roomsData = reviews.map(review => ({
    ...review,
    user: review.user.email,
    delete: (
      <button type="button" onClick={() => onReviewDelete(review.id)}>
        delete
      </button>
    ),
  }));

  return <AdminPanel data={roomsData} />;
}
