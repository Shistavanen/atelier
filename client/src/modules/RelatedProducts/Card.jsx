import React from 'react';

export default function Card({ productCategory, productName, productPrice, productImage }) {

  return (
    <div style={{height: '300px', width: '200px', border: 'solid black', display:'flex', flexDirection: 'column'}}>
      <img src={productImage} width='200' height='225' style={{objectFit: 'cover'}} />
      <small>{productCategory.toUpperCase()}</small>
      <strong>{productName}</strong>
      <small>${productPrice.salePrice ? <div style={{color: 'red'}}>{productPrice.salePrice}</div> : productPrice.originalPrice }</small>
    </div>
  )
}