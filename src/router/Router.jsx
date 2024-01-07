import { Outlet, createBrowserRouter } from 'react-router-dom';

import Layout from 'components/layout';
import Hotel from 'pages/hotelPage';
import Main from 'pages/mainPage';
import NotFoundPage from 'pages/notFoundPage';
import SearchResultsPage from 'pages/searchResultsPage';
import SignIn from 'pages/signinPage';
import SignUp from 'pages/signupPage';
import AdminHotelsPage from 'pages/adminHotelsPage';
import AdminHotelRoomsPage from 'pages/adminHotelRoomPage';
import AdminRoomReviewsPage from 'pages/adminRoomReviewsPage';
import WithAdmin from 'components/withAdmin';

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
        path: 'hotels/:hotelId',
        element: <Hotel />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
      {
        path: 'searchresults',
        element: <SearchResultsPage />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: '/admin',
        element: (
          <WithAdmin>
            <h1>Admin panel</h1>
            <Outlet />
          </WithAdmin>
        ),
        children: [
          {
            path: '/admin/hotels',
            element: <AdminHotelsPage />,
          },
          {
            path: '/admin/hotels/:hotelId/rooms',
            element: <AdminHotelRoomsPage />,
          },
          {
            path: '/admin/hotels/:hotelId/rooms/:roomId/reviews',
            element: <AdminRoomReviewsPage />,
          },
        ],
      },
    ],
  },
]);
