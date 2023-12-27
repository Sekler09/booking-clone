const URL = import.meta.env.VITE_FETCH_URL;

export default async function createRoom(hotelId, data) {
  const response = await fetch(`${URL}/hotels/${hotelId}/rooms`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
