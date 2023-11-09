import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import 'react-day-picker/dist/style.css';

import GlobalStyle from 'styles/globalStyle';
import { darkTheme, lightTheme } from 'styles/theme';

import authApi from 'api/auth';
import { removeUser, setUser } from 'store/slices/userSlice';
import Router from './router/Router';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    authApi
      .getProfile()
      .then(r => {
        if (!r.ok) {
          dispatch(removeUser());
          throw new Error('error');
        }
        return r.json();
      })
      .then(data => {
        dispatch(setUser(data));
      })
      .catch(e => e);
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
