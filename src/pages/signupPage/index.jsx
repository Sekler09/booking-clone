import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import AuthForm from 'components/authForm';
import authApi from 'api/auth';
import { setTokenTime } from 'store/slices/userSlice';

function SignUp() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => !!state.user.user);
  const dispatch = useDispatch();

  const onSubmit = async (formData, onError) => {
    await authApi
      .signUp(formData)
      .then(async r => {
        if (!r.ok) {
          onError(await r.json().then(data => data.message));
          throw new Error('bad request');
        }
        return r.json();
      })
      .then(data => {
        const { exp } = jwtDecode(data.access_token);
        const { iat } = jwtDecode(data.access_token);
        dispatch(setTokenTime({ exp, iat }));
      })
      .then(() => navigate(0));
  };

  return isLoggedIn ? <Navigate to="/" /> : <AuthForm onSubmit={onSubmit} />;
}

export default SignUp;
