import { devLink } from './helpers';

export default async function getHotelsByCity(city) {
  const response = await fetch(`${devLink}/hotels?city=${city}`);
  return response;
}
