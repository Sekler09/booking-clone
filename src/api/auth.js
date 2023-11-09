async function signUp(formData) {
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

async function signIn(formData) {
  const response = await fetch('http://localhost:3000/auth/signin', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
}

async function logout() {
  const response = await fetch('http://localhost:3000/auth/logout', {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}

async function refresh() {
  const response = await fetch('http://localhost:3000/auth/refresh', {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}

async function getProfile() {
  const response = await fetch('http://localhost:3000/auth/profile', {
    credentials: 'include',
    method: 'GET',
  });
  return response;
}

export default { signUp, signIn, logout, refresh, getProfile };
