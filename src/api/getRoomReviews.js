const URL = import.meta.env.VITE_FETCH_URL;

export default async function getRoomReviews(hotelId, roomId, search, sort) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/reviews?search=${search}&sort=${sort}`,
    {
      credentials: 'include',
    },
  );
  return response;
}
