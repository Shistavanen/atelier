import React, { useState, useEffect } from 'react'
import './fontawesome.js'
import axios from 'axios'
import Category from './ProductInfo/Category.jsx'
import Title from './ProductInfo/Title.jsx'
import Price from './ProductInfo/Price.jsx'
import StarRating from './ProductInfo/StarRating.jsx'
import Overview from './ProductInfo/Overview.jsx'
import MyOutfitButton from './ProductInfo/MyOutfitButton.jsx'
import StyleSelector from './StyleSelector/StyleSelector.jsx'
import Cart from './Cart/Cart.jsx'

import Gallery from './Gallery/Gallery.jsx'
import MiniRelatedProducts from './MiniRelatedProducts.jsx'

export default function ProductOverview({ product, productId, setProductId, setProduct }) {

  function getCurrentProductData(id) {
    return axios.get(`/productOverview/${id}`) //orchestrates endpoint
      .then(results => {
        return results.data
    })
  }

  const [currentProduct, setCurrentProduct] = useState(product)
  const [category, setCategory] = useState(product.category)
  const [title, setTitle] = useState(product.name)
  const [price, setPrice] = useState(product.default_price)
  const [slogan, setSlogan] = useState(product.slogan)
  const [description, setDescription] = useState(product.description)
  const [id, setId] = useState(productId)

  const [features, setFeatures] = useState([])
  const [reviews, setReviews] = useState([])

  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState(null)
  const [salePrice, setSalePrice] = useState(null)

  const [hideInfo, setHideInfo] = useState(false)

  const [styleTitle, setStyleTitle] = useState('')
  const [highlightedThumbnail, setHighlightedThumbnail] = useState(0)

  const [relatedProducts, setRelatedProducts] = useState([])


  useEffect(()=> {

    getCurrentProductData(id)
      .then(data => {
        console.log("STYLES FROM GET REQ: ", data)
        setFeatures(data.features)
        setReviews(Object.entries(data.reviews))
        setRelatedProducts(data.related)
        setStyles(data.styles)
        setStyle(data.styles[0])
        setStyleTitle(data.styles[0].name)
        setSalePrice(data.styles[0].sale_price)
      })

  }, [])

  //CHECK RELATED PRODUCTS
  useEffect(() => {
    console.log('RELATED PRODUCTS',relatedProducts)
  }, [relatedProducts])

  if(!style || !relatedProducts) return null

  return (
    <div data-testid="productOverviewTest" style={{marginTop: '25px', marginBottom: '30px'}}> {/* increases surrounding margins to approx centering */}
      <div id='upper' style={{display: 'flex'}}>
        <Gallery style={style} setHideInfo={setHideInfo} />
        {hideInfo ? null :
          <div style={{marginLeft: '60px', color: '#25383C'}}>
            <StarRating reviews={reviews}/>
            <br/>
            <Category category={category} />

            <Title title={title} />
            <br />
            <Price price={price} salePrice={salePrice} />
            <br />

            <StyleSelector
              styles={styles}
              style={style}
              setStyle={setStyle}
              styleTitle={styleTitle}
              setStyleTitle={setStyleTitle}
              setPrice={setPrice}
              setSalePrice={setSalePrice}
              highlightedThumbnail={highlightedThumbnail}
              setHighlightedThumbnail={setHighlightedThumbnail}/>
            <br/>

            <Cart style={style} setStyle={setStyle} />
          </div>
         }
        <br></br>

      </div>
      <Overview slogan={slogan} description={description} features={features} />
      <MiniRelatedProducts relatedProducts={relatedProducts} setProductId={setProductId} setProduct={setProduct}/>
    </div>
  )

}