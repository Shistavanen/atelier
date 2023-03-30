import React from 'react';
import Card from './Card.jsx';

export default function RelatedProductsContainer({ relatedProducts }) {

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
      {
        relatedProducts.map(product => (
            <Card
              productImage={product.styles[0].photos[0].thumbnail_url}
              productCategory={product.category}
              productName={product.name}
              productPrice={{originalPrice: product.styles[0].original_price, salePrice: product.styles[0].sale_price}}
            />
        ))
      }
    </div>
  )

}