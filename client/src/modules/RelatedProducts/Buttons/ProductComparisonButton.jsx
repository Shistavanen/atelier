import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './ActionButton.jsx';

export default function ProductComparisonButton({ comparisonHandler }) {

  return (
    <ActionButton clickHandler={comparisonHandler}>
      <div className='starButton'>
        <FontAwesomeIcon icon={faStar} />
      </div>
    </ActionButton>
  )
}