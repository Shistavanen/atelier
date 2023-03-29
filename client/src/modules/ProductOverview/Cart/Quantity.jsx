import React from 'react'

export default function Quantity(props) {

  function getQuantitySelection(e) {
    let quantitySelection = e.target.value || 1;
    props.setQuantitySelection(quantitySelection)
  }

  const dropDownStyle = {
    margin: '3px',
    width: '150px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    color: '#25383C'
  };

  const Limit = 15;
  const dropDownSize = (props.quantity > Limit ? Limit : Number(props.quantity));

  const dropDown = (
    <select
      id='quantitySelector'
      style={dropDownStyle}
      onChange={getQuantitySelection}>
      {Array.from(new Array(dropDownSize), (x, i) => i + 1).map((quantity, i) => (
        <option key={i}>{quantity}</option>
      ))}
    </select>
  );

  const disabledDropDown = (
    <select disabled style={dropDownStyle}>
      <option>-</option>
    </select>
  );

  //must select size for quantity dropdown to be enabled
  const isSizeSelected = !(props.size === 'selectsize' || props.size === null);

  return (
    <>
      {isSizeSelected ? dropDown : disabledDropDown}
    </>
  )

}