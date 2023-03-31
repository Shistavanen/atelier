import React from 'react';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import ActionButton from './Buttons/ActionButton.jsx';
import ProductComparisonButton from './Buttons/ProductComparisonButton.jsx';


export default function RelatedProductsCarousel({ relatedProducts }) {

  const compareProducts = (comparedFeatures) => {
    console.log("FEATURE COMPARISON", comparedFeatures)
  }

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
              key={product.name}
            >
              <ProductComparisonButton comparisonHandler={() => compareProducts(product.features)}/>
            </ProductCard>
        ))
      }
    </Carousel>
  )
}
