const URL = import.meta.env.VITE_FETCH_URL;

export default async function deleteRoomOfHotel(hotelId, roomId) {
  const response = await fetch(`${URL}/hotels/${hotelId}/rooms/${roomId}`, {
    method: 'DELETE',
  });
  return response;
}
