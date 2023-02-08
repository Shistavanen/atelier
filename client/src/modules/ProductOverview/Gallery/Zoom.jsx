import React, { useState, useEffect } from 'react'


export default function Zoom(props) {

  let width = '1500px';
  let height = '800px';

  return (
    <div id='zoomView'
         onClick={props.expandView}
         style={{
           cursor: 'zoom-out',
           backgroundRepeat: 'no-repeat',
           backgroundSize: `${props.naturalWidth * 2.5}px ${props.naturalHeight * 2.5}px`,
           backgroundImage: `url(${props.galleryPhoto})`,
           height: 'auto',
           minHeight: height,
           minWidth: width,
           overflow: 'hidden',
           backgroundPosition: 'center',
           position: 'absolute',
           width: '100%',
           zIndex: '10'
         }}
         >
    </div>
  )
}