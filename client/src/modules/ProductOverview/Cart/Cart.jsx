import React, { useState, useEffect } from 'react'
import Size from './Size.jsx'
import Quantity from './Quantity.jsx'
import CartButton from './CartButton.jsx'
import MyOutfitButton from '../ProductInfo/MyOutfitButton.jsx'

export default function Cart(props) {

  const [size, setSize] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [quantitySelection, setQuantitySelection] = useState(1)
  const [skuId, setSkuId] = useState(null)

  function handleSizeQuantity(style) {
    setSize(style.size)
    setQuantity(style.quantity)
    setSkuId(style.skuId)
  }

  useEffect(()=> {
    console.log(size, quantity, quantitySelection, skuId)
  }, [size, quantity, quantitySelection, skuId])

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', width: '320px'}}>
      <Size style={props.style} setStyle={props.setStyle} handleSizeQuantity={handleSizeQuantity}/>
      <Quantity quantity={quantity} size={size} setQuantitySelection={setQuantitySelection}/>
      <CartButton style={props.style} size={size} quantitySelection={quantitySelection} skuId={skuId} />
      <MyOutfitButton />
    </div>
  )

}