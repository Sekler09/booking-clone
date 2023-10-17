import { useSelector } from 'react-redux';
import 'react-day-picker/dist/style.css';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/globalStyle';
import { darkTheme, lightTheme } from 'styles/theme';

import Router from './router/Router';

function App() {
  const theme = useSelector(state => state.theme.theme);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
