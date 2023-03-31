import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './ActionButton.jsx';

export default function DeleteOutfitButton() {

  return (
    <ActionButton>
      <div style={{backgroundColor: 'white', color: '#25383C', borderRadius: '50%', border: 'none'}}>
        <FontAwesomeIcon icon={faCircleXmark} size='lg'/>
      </div>
    </ActionButton>
  )
}
