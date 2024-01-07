import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import NotFoundPage from 'pages/notFoundPage';
import { node } from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function WithAdmin({ children }) {
  const user = useSelector(state => state.user.user);
  const location = useLocation();

  if (!user.isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <Fragment key={location.pathname + location.hash}>{children}</Fragment>
  );
}

WithAdmin.propTypes = {
  children: node.isRequired,
};
