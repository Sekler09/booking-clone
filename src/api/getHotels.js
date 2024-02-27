const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotels(search) {
  const response = await fetch(`${URL}/hotels?search=${search}`);
  return response;
}
