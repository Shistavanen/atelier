import React, { useState, useEffect, createContext } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../dist/styles.css';
import ReactSwitch from 'react-switch';

import WithClickTracking from './WithClickTracking.jsx'
import ProductOverview from './modules/ProductOverview/ProductOverview.jsx'
import RatingsAndReviews from './modules/RatingsReviews/ratingsAndReviews.jsx'
import QuesAns from './modules/QuestionsAnswers/QuesAns.jsx'

export const ThemeContext = createContext(null);

function App() {

  const url = new URL(window.location.href);

  const getCurrentProduct = () => {
    /* products.data[<index>]
    * 0: Camo Onesie Jacket     id: 71697
    * 1: Sunglasses             id: 71698
    * 2: Morning Joggers Pants  id: 71699
    * 3: Slackers Slacks Pants  id: 71700
    * 4: Heir Force Ones Shoes  id: 71701
    */
    return axios.get('/products')
      .then(products => {
        return products.data[0]
      })
  }

  const [product, setProduct] = useState(null)
  const [productId, setProductId] = useState(null)

  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    getCurrentProduct()
      .then(product => {
        setProduct(product)
        setProductId(product.id)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    url.searchParams.set('product_id', productId);
    window.history.replaceState(null, null, url);
  }, [productId])

  const ProductOverviewWithClickTracking = WithClickTracking(ProductOverview)
  const RatingsAndReviewsWithClickTracking = WithClickTracking(RatingsAndReviews)
  const QuesAnsWithClickTracking = WithClickTracking(QuesAns)

  if(!productId) return null

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="appBackground" id={theme}>

        <h3 className="appTitle">Boba Zone</h3>
        <div className="themeSwitch">
          <ReactSwitch onChange={toggleTheme} checked={theme ==="dark"}/>
        </div>

        <ProductOverviewWithClickTracking product={product} productId={productId}/>
        <RatingsAndReviewsWithClickTracking product_id={productId} productName={product.name}/>
        <QuesAnsWithClickTracking product={product} productId={productId}/>

        <div className="appBottom"> </div>
      </div>
    </ThemeContext.Provider>
  )
}


ReactDOM.render(<App/>, document.getElementById('app'))