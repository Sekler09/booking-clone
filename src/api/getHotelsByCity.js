export default async function getHotelsByCity(city) {
  const response = await fetch(`http://localhost:3000/hotels?city=${city}`);
  return response;
}
