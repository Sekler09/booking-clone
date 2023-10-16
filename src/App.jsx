import { useState } from 'react';
import 'react-day-picker/dist/style.css';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from 'styles/globalStyle';
import { theme, darkTheme, lightTheme } from 'styles/theme';

import Router from './router/Router';

function App() {
  const [mode] = useState('dark');
  return (
    <ThemeProvider
      theme={{ ...theme, ...(mode === 'dark' ? darkTheme : lightTheme) }}
    >
      <GlobalStyle />
      <RouterProvider router={Router} />
    </ThemeProvider>
  );
}

export default App;
