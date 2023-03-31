import React from 'react';

export default function ListHeading({ heading }) {

  return (
    <h3><small>{heading.toUpperCase()}</small></h3>
  )
}