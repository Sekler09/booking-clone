import Layout from 'components/layout';
import Hotel from 'pages/HotelPage';
import Main from 'pages/mainPage';
import Room from 'pages/RoomPage';
import { createBrowserRouter } from 'react-router-dom';

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
