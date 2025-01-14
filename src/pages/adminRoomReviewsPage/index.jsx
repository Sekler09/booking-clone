import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AdminPanel from 'components/adminPanel';
import Loader from 'components/loader';
import deleteReview from 'api/deleteReview';
import getRoomReviews from 'api/getRoomReviews';

import { DeleteIcon, PanelCell, PanelRow } from 'components/adminPanel/styled';

const LABELS = [
  { label: 'id', sort: false },
  { label: 'rating', sort: true },
  { label: 'comment', sort: true },
  { label: 'reviewer', sort: false },
  { label: 'delete', sort: false },
];

export default function AdminRoomReviewsPage() {
  const { hotelId, roomId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState('');

  useEffect(() => {
    getRoomReviews(hotelId, roomId, search, sorting)
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
  }, [search, sorting]);

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

  return (
    <AdminPanel labels={LABELS} onSearch={setSearch} onSort={setSorting}>
      {reviews.map(review => (
        <PanelRow key={review.id}>
          <PanelCell>{review.id}</PanelCell>
          <PanelCell>{review.rating}</PanelCell>
          <PanelCell>{review.comment}</PanelCell>
          <PanelCell>{review.user.email}</PanelCell>
          <PanelCell>
            <DeleteIcon onClick={() => onReviewDelete(review.id)} />
          </PanelCell>
        </PanelRow>
      ))}
    </AdminPanel>
  );
}
