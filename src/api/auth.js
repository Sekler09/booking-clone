const URL = import.meta.env.VITE_FETCH_URL;

async function signUp(formData) {
  const response = await fetch(`${URL}/auth/signup`, {
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
  const response = await fetch(`${URL}/auth/signin`, {
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
  const response = await fetch(`${URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}

async function refresh() {
  const response = await fetch(`${URL}/auth/refresh`, {
    credentials: 'include',
    method: 'POST',
  });
  return response;
}

async function getProfile() {
  const response = await fetch(`${URL}/auth/profile`, {
    credentials: 'include',
    method: 'GET',
  });
  return response;
}

export default { signUp, signIn, logout, refresh, getProfile };
