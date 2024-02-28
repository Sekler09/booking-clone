const URL = import.meta.env.VITE_FETCH_URL;

export default async function getHotelRooms(id, search, sort) {
  const response = await fetch(
    `${URL}/hotels/${id}/rooms?search=${search}&sort=${sort}`,
    {
      credentials: 'include',
    },
  );
  return response;
}
