import React from 'react';
import Card from './Card.jsx';
import StarRating from '../../utils/StarRating.jsx';

export default function ProductCard({ productCategory, productName, productPrice, productImage, productRatings }) {
  const RELATED_PRODUCTS_STAR_WIDTH = 16;
  const RELATED_PRODUCTS_STAR_HEIGHT = 21;

  return (
    <Card>
      <img src={productImage} width='200' height='225' style={{objectFit: 'cover'}} />
      <div style={{marginLeft: '5px', display:'flex', flexDirection: 'column'}}>
        <small>{productCategory.toUpperCase()}</small>
        <strong>{productName}</strong>
        <small>${productPrice.salePrice ? <div style={{color: 'red'}}>{productPrice.salePrice}</div> : productPrice.originalPrice }</small>
        <StarRating productRatings={productRatings} starWidth={RELATED_PRODUCTS_STAR_WIDTH} starHeight={RELATED_PRODUCTS_STAR_HEIGHT}/>
      </div>
    </Card>
  )
}


