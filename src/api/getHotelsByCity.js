export default async function getHotelsByCity(city) {
  const response = await fetch(
    `https://booking-db.onrender.com/hotels?city=${city}`,
  );
  return response;
}
