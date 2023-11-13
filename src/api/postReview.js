const URL = import.meta.env.VITE_FETCH_URL;

export default async function postReview(review) {
  const response = await fetch(`${URL}/reviews`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review),
  });
  return response;
}
