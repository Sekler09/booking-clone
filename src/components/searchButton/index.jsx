import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './styled';

export default function SearchButton() {
  const location = useLocation();

  function refreshPageIfLinkToTheSamePage(pathname) {
    if (location.pathname === pathname) {
      window.location.reload();
    }
  }

  return (
    <Button>
      <Link
        to="/searchresults"
        onClick={() => refreshPageIfLinkToTheSamePage('/searchresults')}
      >
        Search
      </Link>
    </Button>
  );
}
