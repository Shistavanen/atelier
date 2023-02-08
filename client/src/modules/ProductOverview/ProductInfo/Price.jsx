import React from 'react'

export default function Price(props) {

  if(props.salePrice) {
    return (
      <div data-testid='priceTest'>
      <div style={{color:'#FF0000'}}>${props.salePrice}</div><div><s>${props.price}</s></div>
      </div>
    )
  } else {
    return(
      <div data-testid='priceTest'>
        ${props.price}
      </div>
    )
  }

}