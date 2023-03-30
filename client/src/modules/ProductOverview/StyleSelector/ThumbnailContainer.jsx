import React from 'react'
import Thumbnail from './Thumbnail.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ThumbnailContainer(props) {

  function handleClick(style, index) {
    props.setStyleTitle(style.name)
    props.setStyle(style)

    props.setPrice(style.original_price)
    props.setSalePrice(style.sale_price)

    props.setHighlightedThumbnail(index)
  }


  return (
    <div data-testid='thumbnailContainerTest'>
      <div id='styleTitleContainer'>
        <strong>STYLE > </strong>{props.styleTitle.toUpperCase()}
      </div>
      <br/>
      <br/>
      <div id='stylesThumbnailContainer'>
      {props.styles.map((style, i) => (
        <div id='checkedStyleDiv' onClick={()=>handleClick(style, i)} key={style.style_id}>
          {props.highlightedThumbnail === i ?
            <div>
              <FontAwesomeIcon
                icon="fa-solid fa-circle-check"
                id='styleCheckMark'
              />
              <Thumbnail
                style={style}
                index={i}
                src={style.photos[0].thumbnail_url}
              />
            </div>
            :
            <Thumbnail
              style={style}
              index={i}
              src={style.photos[0].thumbnail_url}
            />
          }
        </div>
      ))}
      </div>
    </div>
  )
}