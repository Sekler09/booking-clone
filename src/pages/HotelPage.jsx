import React from 'react';
import { useParams } from 'react-router-dom';

export default function Hotel() {
  const { id } = useParams();
  return <h1>{`Hotel${id}`}</h1>;
}
