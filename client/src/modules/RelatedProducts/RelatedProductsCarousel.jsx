import React from 'react';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';

export default function RelatedProductsCarousel({ relatedProducts }) {

  return (
    <Carousel>
      {
        relatedProducts.map(product => (
            <ProductCard
              productImage={product.styles[0].photos[0].thumbnail_url}
              productCategory={product.category}
              productName={product.name}
              productPrice={{originalPrice: product.styles[0].original_price, salePrice: product.styles[0].sale_price}}
              productRatings={Object.entries(product.reviews)}
            />
        ))
      }
    </Carousel>
  )
}