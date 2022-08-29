import React, { useState, useEffect } from 'react'
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

export default function ProductOverview({ product, productId }) {

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

  const [styles, setStyles] = useState([])
  const [style, setStyle] = useState(null)
  const [salePrice, setSalePrice] = useState(null)

  useEffect(()=> {

    getCurrentProductData(id)
      .then(data => {
        console.log("STYLES FROM GET REQ: ", data)
        setFeatures(data.features)
        setStyles(data.styles)
        setStyle(data.styles[0])
        setSalePrice(data.styles[0].sale_price)
      })

  }, [])

  if(style) {
    return (
      <div>
        <Category category={category} />
        <Title title={title} />
        <Price price={price} salePrice={salePrice} />
        <StarRating />
        <Overview slogan={slogan} description={description} features={features} />
        <MyOutfitButton />

        <StyleSelector styles={styles} setStyle={setStyle} setPrice={setPrice} setSalePrice={setSalePrice} />

        <Cart style={style} setStyle={setStyle} />
        <br></br>
        <Gallery style={style} />
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}