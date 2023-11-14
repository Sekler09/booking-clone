import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AuthForm from 'components/authForm';
import authApi from 'api/auth';

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(state => !!state.user.user);

  const onSubmit = async (formData, onError) => {
    await authApi
      .signIn(formData)
      .then(async r => {
        if (!r.ok) {
          onError(await r.json().then(data => data.message));
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(() => navigate(0, { state: { prev: location.state?.prev } }));
  };

  return isLoggedIn ? (
    <Navigate to={location.state.prev ?? '/'} />
  ) : (
    <AuthForm onSubmit={onSubmit} />
  );
}

export default SignIn;
