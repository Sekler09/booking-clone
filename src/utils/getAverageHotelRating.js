export default function getAverageRating(hotel) {
  const reviews = hotel.rooms.reduce(
    (allReviews, room) => allReviews.concat(room.reviews),
    [],
  );
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRatings / reviews.length;
}
