export default async function logout() {
  const response = await fetch('http://localhost:3000/auth/logout', {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}
