import React from 'react'

export default function Thumbnail(props) {

  return (
    <img
      src={props.src}
      width='75'
      height='75'
      style={{borderRadius: '50%', cursor:'pointer', objectFit: 'cover', border: '1px solid #000000'}}
      className='product-style_thumnbnail'
    />
  )
}