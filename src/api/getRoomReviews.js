const URL = import.meta.env.VITE_FETCH_URL;

export default async function getRoomReviews(hotelId, roomId, search) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/reviews?search=${search}`,
    {
      credentials: 'include',
    },
  );
  return response;
}
