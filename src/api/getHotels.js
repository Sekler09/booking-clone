const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotels(search, sorting) {
  const response = await fetch(
    `${URL}/hotels?search=${search}&sort=${sorting}`,
  );
  return response;
}
