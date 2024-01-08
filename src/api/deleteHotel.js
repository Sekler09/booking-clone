const URL = import.meta.env.VITE_FETCH_URL;

export default async function deleteHotelById(id) {
  const response = await fetch(`${URL}/hotels/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response;
}
