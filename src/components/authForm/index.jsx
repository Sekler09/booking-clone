import { func } from 'prop-types';
import { useState } from 'react';

function AuthForm({ onSubmit }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <form onSubmit={e => onSubmit(e, { password, email })}>
      <input type="email" onChange={onEmailChange} value={email} />
      <input type="password" onChange={onPasswordChange} value={password} />
      <button type="submit">Submit</button>
    </form>
  );
}

AuthForm.propTypes = {
  onSubmit: func.isRequired,
};

export default AuthForm;
