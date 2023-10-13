const URL = import.meta.env.VITE_FETCH_URL;

export default async function updateHotel(hotel) {
  const response = await fetch(`${URL}/hotels/${hotel.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hotel),
  });
  return response;
}
