import { createBrowserRouter } from 'react-router-dom';

import Main from 'pages/MainPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
]);
