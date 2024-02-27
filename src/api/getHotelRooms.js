const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotelRooms(id, search) {
  const response = await fetch(`${URL}/hotels/${id}/rooms?search=${search}`, {
    credentials: 'include',
  });
  return response;
}
