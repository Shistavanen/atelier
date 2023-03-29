import React, { useState } from 'react'

export default function Size(props) {

  let stock = Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0)
  let inStock = Object.entries(props.style.skus).filter(sku => sku[1].quantity > 0).length;

  const sizeDropdownStyle = {
    margin: '3px',
    width: '150px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    color: '#25383C'
  }

  const handleSizeQuantity = (e) => {
    const sizeOptions = {
      size: e.target.value,
      quantity: e.target.selectedOptions[0].dataset.quantity,
      skuId: e.target.selectedOptions[0].dataset.skuid
    };

    props.handleSizeQuantity(sizeOptions);
  }

  const outOfStockDropdown = (
    <select disabled style={sizeDropdownStyle}>
      <option>Out Of Stock</option>
    </select>
  );

  const sizeDropdown = (
    <select
      id='sizeSelector'
      style={sizeDropdownStyle}
      onChange={handleSizeQuantity}
    >

      <option value='selectsize'>Select Size</option>
      {stock.map((sku, i) => (
        <option data-quantity={sku[1].quantity} data-skuid={sku[0]} key={i}>{sku[1].size}</option>
      ))}

    </select>
  );

  return (
    <>
      {inStock ? sizeDropdown : outOfStockDropdown}
    </>
  )
}