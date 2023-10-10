const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotelById(id) {
  const response = await fetch(`${URL}/hotels/${id}`);
  return response;
}
