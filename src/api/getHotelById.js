import { devLink } from './helpers';

export default async function getHotelById(id) {
  const response = await fetch(`${devLink}/hotels/${id}`);
  return response;
}
