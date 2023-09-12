import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { Button } from './styled';

export default function SearchButton() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  function refreshPageIfLinkToTheSamePage(pathname) {
    if (location.pathname === pathname) {
      window.location.reload();
    }
  }

  return (
    <Button>
      <Link
        to={`/searchresults?${searchParams.toString()}`}
        onClick={() => refreshPageIfLinkToTheSamePage('/searchresults')}
      >
        Search
      </Link>
    </Button>
  );
}
