import getAverageRating from 'utils/getAverageHotelRating';

function sortByPriceLow(a, b) {
  return (
    Math.min(...a.rooms.map(room => room.price)) -
    Math.min(...b.rooms.map(room => room.price))
  );
}
function sortByPriceHigh(a, b) {
  return (
    Math.max(...b.rooms.map(room => room.price)) -
    Math.max(...a.rooms.map(room => room.price))
  );
}

function sortByRatingHigh(a, b) {
  return getAverageRating(b) - getAverageRating(a);
}

function sortByRatingLow(a, b) {
  return getAverageRating(a) - getAverageRating(b);
}

export function getSorting(sortingString) {
  switch (sortingString) {
    case 'PRICE_LOW_TO_HIGH':
      return sortByPriceLow;
    case 'PRICE_HIGH_TO_LOW':
      return sortByPriceHigh;
    case 'RATING_HIGH_TO_LOW':
      return sortByRatingHigh;
    case 'RATING_LOW_TO_HIGH':
      return sortByRatingLow;
    default:
      return () => {};
  }
}
