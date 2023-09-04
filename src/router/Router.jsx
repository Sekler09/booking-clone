import { createBrowserRouter } from 'react-router-dom';

import Main from 'pages/MainPage';
import Layout from '../components/Layout';
import Hotel from '../pages/HotelPage';
import Room from '../pages/RoomPage';

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: 1,
        element: <Main />,
      },
      {
        path: 'hotels/:id',
        element: <Hotel />,
      },
      {
        path: 'hotels/:hotelId/rooms/:roomId',
        element: <Room />,
      },
      {
        path: '*',
        element: <h1>Page not found</h1>,
      },
    ],
  },
]);
