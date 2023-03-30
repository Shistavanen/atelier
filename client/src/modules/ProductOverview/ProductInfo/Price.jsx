import React from 'react'

export default function Price(props) {

  const price = (
    <div data-testid='priceTest'>
      ${props.price}
    </div>
  );

  const salePrice = (
    <div data-testid='priceTest'>
      <div style={{color:'#FF0000'}}>${props.salePrice}</div><div><s>${props.price}</s></div>
    </div>
  );

  return props.salePrice ? salePrice : price;

}