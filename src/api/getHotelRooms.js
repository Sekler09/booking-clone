const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotelRooms(id) {
  const response = await fetch(`${URL}/hotels/${id}/rooms`, {
    credentials: 'include',
  });
  return response;
}
