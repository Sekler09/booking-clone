export default async function signUp(formData) {
  const response = await fetch('http://localhost:3000/auth/signup', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
}
