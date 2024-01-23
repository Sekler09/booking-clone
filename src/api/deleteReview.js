const URL = import.meta.env.VITE_FETCH_URL;

export default async function deleteReview(hotelId, roomId, reviewId) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/reviews/${reviewId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  return response;
}
