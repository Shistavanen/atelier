import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function CartButton(props) {

  function addItemToCart() {
    axios
      .post('/cart', { sku_id: props.skuId })
      .catch(err => console.log(err));
  };

  const cartButton = (
    <button
      onClick={addItemToCart}
      style={{margin: '3px', height: '50px', width: '150px', color: '#25383C', fontSize: '20px'}}
    >
      Add to Cart +
    </button>
  );

  const customerHasSelectedSizeAndQuantity = (props.size && props.size !== 'selectsize') && props.quantitySelection;

  return customerHasSelectedSizeAndQuantity ?  cartButton : null;

}