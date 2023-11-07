export default async function refresh() {
  const response = await fetch('http://localhost:3000/auth/refresh', {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}
