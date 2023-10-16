import { createBrowserRouter } from 'react-router-dom';

import Layout from 'components/layout';
import Hotel from 'pages/hotelPage';
import Main from 'pages/mainPage';
import SearchResultsPage from 'pages/searchResultsPage';
import getHotelById from 'api/getHotelById';

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
        loader: async ({ params }) => {
          return getHotelById(params.id);
        },
        element: <Hotel />,
      },
      {
        path: '*',
        element: <h1>Page not found</h1>,
      },
      {
        path: 'searchresults',
        element: <SearchResultsPage />,
      },
    ],
  },
]);
