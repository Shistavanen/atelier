import React from 'react'

export default function Quantity(props) {

  function getQuantitySelection(e) {
    let quantitySelection = e.target.value || 1;
    props.setQuantitySelection(quantitySelection)
  }

  //must select size for quantity dropdown to be enabled
  if(props.size === 'selectsize' || props.size === null) {
    return (
        <select disabled style={{margin: '3px', width: '150px', height: '50px', textAlign: 'center', fontSize: '20px', color: '#25383C'}}>
          <option>-</option>
        </select>
    )
  } else {

    //quantity to be capped at 15
    let limit;
    if(props.quantity > 15) {
      limit = 15
    } else {
      limit = Number(props.quantity)
    }

    return (
        <select
          id='quantitySelector'
          style={{
            margin: '3px',
            width: '150px',
            height: '50px',
            textAlign: 'center',
            fontSize: '20px',
            color: '#25383C'
            }}
          onChange={e=>getQuantitySelection(e)}>
          {Array.from(new Array(limit), (x, i) => i + 1).map((quantity, i) => (
            <option key={i}>{quantity}</option>
          ))}
        </select>
    )
  }
}