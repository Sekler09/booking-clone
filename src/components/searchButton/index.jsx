import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from './styled';

export default function SearchButton() {
  return (
    <Button>
      <Link to="/searchresults">Search</Link>
    </Button>
  );
}
