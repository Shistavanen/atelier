import React, { useState } from 'react'

export default function Size(props) {

  let stock = Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0)
  let inStock = Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0).length;

  if(!inStock) {
    return (
      <select disabled style={{margin: '3px', width: '150px', height: '50px', textAlign: 'center', fontSize: '20px', color: '#25383C'}}>
        <option>Out Of Stock</option>
      </select>
    )
  } else {
    return (
        <select
          id='sizeSelector'
          style={
            {margin: '3px',
            width: '150px',
            height: '50px',
            textAlign: 'center',
            fontSize: '20px',
            color: '#25383C'}
          }
          onChange={(e)=>props.handleSizeQuantity(
            {
              size: e.target.value,
              quantity: e.target.selectedOptions[0].dataset.quantity,
              skuId: e.target.selectedOptions[0].dataset.skuid
            }
          )}>

          <option value='selectsize'>Select Size</option>
          {stock.map((sku, i) => (  //check quantity > 0
            <option data-quantity={sku[1].quantity} data-skuid={sku[0]} key={i}>{sku[1].size}</option>
          ))}

        </select>
    )
  }


}