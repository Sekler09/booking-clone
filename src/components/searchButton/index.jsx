import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import { LinkButton } from './styled';

export default function SearchButton() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  function refreshPageIfLinkToTheSamePage(pathname) {
    if (location.pathname === pathname) {
      window.location.reload();
    }
  }

  const toUrl = `/searchresults?${searchParams.toString()}`;

  return (
    <LinkButton
      to={toUrl}
      onClick={() => refreshPageIfLinkToTheSamePage('/searchresults')}
      data-cy="search-btn"
    >
      Search
    </LinkButton>
  );
}
