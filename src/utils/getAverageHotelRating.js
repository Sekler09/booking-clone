export default function getAverageRating(hotel) {
  const { reviews } = hotel;
  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  return reviews.length ? totalRatings / reviews.length : 0;
}
