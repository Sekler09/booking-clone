import React from 'react';
import { useSelector } from 'react-redux';

export default function SearchResultsPage() {
  const inputs = useSelector(state => state.inputs);

  return (
    <div>
      {inputs.city}
      {inputs.dates.from.toISOString()}
      {inputs.dates.to.toISOString()}
    </div>
  );
}
