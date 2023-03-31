import React from 'react';

export default function ActionButton({ clickHandler, bgColor, children }) {

  return (
    <button className='actionButton' onClick={clickHandler} style={{backgroundColor: bgColor}}>
      {children}
    </button>
  )
}