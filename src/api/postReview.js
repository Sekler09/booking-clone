const URL = import.meta.env.VITE_FETCH_URL;

export default async function postReview(hotelId, roomId, review) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/reviews`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    },
  );
  return response;
}
