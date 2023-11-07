export default async function getProfile() {
  const response = await fetch('http://localhost:3000/auth/profile', {
    credentials: 'include',
    method: 'GET',
  });
  return response;
}
