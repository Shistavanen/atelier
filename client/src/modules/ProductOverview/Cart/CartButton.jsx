import React, { useState, useEffect } from 'react'
import axios from 'axios'


export default function CartButton(props) {

  console.log('CARTBUTTON QS: ', props.quantitySelection)

  function addItemToCart() {
    axios.post('/cart', {
      sku_id: props.skuId
    } )
      .then(results => {
        console.log(results.data)
      })
  }

  if((props.size && props.size !== 'selectsize') && props.quantitySelection) {

    return (
      <button onClick={addItemToCart} style={{margin: '3px', height: '50px', width: '150px', color: '#25383C', fontSize: '20px'}}>Add to Cart +</button>
    )
  }

}