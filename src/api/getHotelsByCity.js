const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotelsByCity(city) {
  const response = await fetch(`${URL}/hotels?city=${city}`);
  return response;
}
