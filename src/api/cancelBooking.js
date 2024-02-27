const URL = import.meta.env.VITE_FETCH_URL;

export default async function cancelBooking(userId, bookingId) {
  const response = await fetch(`${URL}/users/${userId}/bookings/${bookingId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return response;
}
