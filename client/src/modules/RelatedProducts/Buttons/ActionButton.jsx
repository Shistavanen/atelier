import React from 'react';

export default function ActionButton({ clickHandler, children }) {

  const transparentBg = `rgba(0, 0, 0, 0)`;

  return (
    <button className='actionButton' onClick={clickHandler} style={{backgroundColor: transparentBg}}>
      {children}
    </button>
  )
}