import React from 'react'
import ThumbnailContainer from './ThumbnailContainer.jsx'

export default function StyleSelector(props) {

  return (
    <ThumbnailContainer
      styles={props.styles}
      setStyle={props.setStyle}
      setStyleTitle={props.setStyleTitle}
      styleTitle={props.styleTitle}
      setPrice={props.setPrice}
      setSalePrice={props.setSalePrice}
      highlightedThumbnail={props.highlightedThumbnail}
      setHighlightedThumbnail={props.setHighlightedThumbnail}
    />
  )

}