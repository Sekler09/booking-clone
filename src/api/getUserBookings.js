const URL = import.meta.env.VITE_FETCH_URL;

export default async function getUserBookings(userId) {
  const response = await fetch(`${URL}/users/${userId}/bookings`, {
    credentials: 'include',
  });
  return response;
}
