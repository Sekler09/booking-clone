const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotels() {
  const response = await fetch(`${URL}/hotels`);
  return response;
}
