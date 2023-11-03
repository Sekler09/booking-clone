import AuthForm from 'components/authForm';
import { useState } from 'react';

function LogIn() {
  const [token, setToken] = useState('');

  const onSubmit = async (e, formData) => {
    e.preventDefault();
    console.log('data', formData);
    await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(r => r.json())
      .then(data => setToken(data.access_token));
  };

  // const onSubmit = async e => {
  //   e.preventDefault();
  //   await fetch('http://localhost:3000/auth/refresh', {
  //     method: 'POST',
  //   })
  //     .then(r => r.json())
  //     .then(data => setToken(data.access_token));
  // };

  console.log(token);
  return <AuthForm onSubmit={onSubmit} />;
}

export default LogIn;
