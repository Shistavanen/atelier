import React from 'react';
import Carousel from './Carousel.jsx';
import ProductCard from './ProductCard.jsx';
import ActionButton from './ActionButton.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function RelatedProductsCarousel({ relatedProducts }) {

  const comparisonHandler = (e) => {
    console.log('Clicked');
  }

  const transparentBg = `rgba(0, 0, 0, 0)`;

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
            >

              <ActionButton clickHandler={comparisonHandler} bgColor={transparentBg}>
                <div className='starButton'>
                  <FontAwesomeIcon icon={faStar}/>
                </div>
              </ActionButton>

            </ProductCard>
        ))
      }
    </Carousel>
  )
}
