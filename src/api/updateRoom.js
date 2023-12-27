const URL = import.meta.env.VITE_FETCH_URL;

export default async function updateHotel(hotelId, roomId, data) {
  const response = await fetch(`${URL}/hotels/${hotelId}/rooms/${roomId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
