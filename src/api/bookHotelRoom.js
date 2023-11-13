const URL = import.meta.env.VITE_FETCH_URL;

export default async function bookHotelRoom(hotelId, roomId, dates) {
  const response = await fetch(
    `${URL}/hotels/${hotelId}/rooms/${roomId}/book`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dates),
    },
  );
  return response;
}
