import store from 'store/store';
import signUp from './signUp';
import signIn from './signIn';
import refresh from './refresh';
import logout from './logout';
import getProfile from './getProfile';

function isTokenExpired(expTime, iatTime) {
  const tokenLifeTime = expTime - iatTime;

  return expTime - Date.now() / 1000 < tokenLifeTime / 2;
}

function withRefresh(apiReq) {
  return async (...data) => {
    const { tokenExp, tokenIat } = store.getState().user;

    if (isTokenExpired(tokenExp, tokenIat)) {
      await refresh();
    }

    return apiReq(...data);
  };
}
const authApi = {
  signUp,
  signIn,
  logout: withRefresh(logout),
  getProfile: withRefresh(getProfile),
  refresh,
};
export default authApi;
