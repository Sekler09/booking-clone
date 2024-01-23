const URL = import.meta.env.VITE_FETCH_URL;

export default async function getRoomReviews(hotelId, roomId) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/reviews`,
    {
      credentials: 'include',
    },
  );
  return response;
}
