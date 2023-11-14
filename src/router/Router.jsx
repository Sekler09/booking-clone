import { createBrowserRouter } from 'react-router-dom';

import Layout from 'components/layout';
import Hotel from 'pages/hotelPage';
import Main from 'pages/mainPage';
import NotFoundPage from 'pages/notFoundPage';
import SearchResultsPage from 'pages/searchResultsPage';
import SignIn from 'pages/signinPage';
import SignUp from 'pages/signupPage';

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
    ],
  },
]);
