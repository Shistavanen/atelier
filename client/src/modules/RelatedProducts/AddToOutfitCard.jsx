import React from 'react';
import Card from './Card.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddToOutfitCard() {

  return (
    <Card>
      <div style={{backgroundColor: 'gray'}}>
        <FontAwesomeIcon
          icon="fa-light fa-circle-plus"
          id='AddToOutfitButton'
          cursor={'pointer'}
        />
      </div>
    </Card>
  )
}