import AuthForm from 'components/authForm';
import { useEffect, useState } from 'react';

function SignIn() {
  const [token, setToken] = useState('');

  const onSubmit = async formData => {
    await fetch('http://localhost:3000/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(r => r.json())
      .then(data => setToken(data.access_token));
  };

  useEffect(() => {
    localStorage.setItem('accessToken', token);
  }, [token]);

  return <AuthForm onSubmit={onSubmit} />;
}

export default SignIn;
