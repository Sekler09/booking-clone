const URL = import.meta.env.VITE_FETCH_URL;

export default async function createHotel(data) {
  const response = await fetch(`${URL}/hotels`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response;
}
