const URL = import.meta.env.VITE_FETCH_URL;

export default async function getAvailableHotels({
  city,
  from,
  to,
  children,
  adults,
  rooms,
}) {
  const response = await fetch(
    `${URL}/hotels?city=${city}&from=${from ?? '0'}&to=${
      to ?? '0'
    }&children=${children}&adults=${adults}&rooms=${rooms}`,
  );
  return response;
}
