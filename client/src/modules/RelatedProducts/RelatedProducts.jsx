import React, {useState, useEffect } from 'react';
import axios from 'axios';
import RelatedProductsContainer from './RelatedProductsContainer.jsx';

export default function RelatedProducts({ product, productId }) {

  const [relatedProductsIds, setRelatedProductsIds] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelatedProductIds = (productId) => {
    return axios.get(`/relatedProducts/${productId}`)
      .then(({ data }) => data)
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getRelatedProductIds(productId)
      .then(relatedProductsIds => setRelatedProductsIds([...new Set(relatedProductsIds)]))
      .catch(err => console.log(err));
  }, [productId]);

  useEffect(() => {
    let apiPromises = relatedProductsIds.map(id => {
      return axios.get(`/productOverview/${id}`)
        .then(({ data }) => data)
        .catch(err => {
          console.log('ERROR GETTING PROD INFO FROM EXPRESS API')
          console.log(err => console.log(err));
        })
    })

    Promise.all(apiPromises)
      .then(relatedProducts => {
        console.log('RELATED PRODUCTS: ', relatedProducts)
        setRelatedProducts(relatedProducts);
      })
      .catch(err => {
        console.log('==>ERROR RESOLVING RELATED PRODUCTS API REQS<==');
        console.log(err);
      })

  }, [relatedProductsIds]);

  if(!relatedProducts.length) return null;

  return (
    <RelatedProductsContainer relatedProducts={relatedProducts} />
  )
}


























// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default class RelatedProducts extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name0 : '',
//       original_price0 : '',
//       photo0 : '',
//       name1 : '',
//       original_price1 : '',
//       photo1 : '',
//       rating1 : 0,
//       rating2 : 0,
//       liked : false,
//       related : [],
//   }

//   }

//   componentDidMount() {
//     this.getRelate();
//     this.getProductsSyles();
//     this.getReviews();
//   }

//    getRelate() {
//     let id = 71701;
//      axios.get(`/products/${id}/related`)
//     .then((data) => {
//       let uni = [...new Set(data.data)]; //[71702, 71704, 71705, 71697, 71699]
//       this.setState({
//         related : uni,
//       });
//     })
//   }

//   getProductsSyles() {
//     console.log("############",this.related)
//     let id = 71702;
//      axios.get(`/productOverview/${id}`)
//     .then((data) => {
//       this.setState({
//         name0 : data.data.styles[0].name,
//         original_price0 : data.data.styles[0].original_price,
//         photo0 : data.data.styles[0].photos[0].url,
//       });
//     })
//     let id1 = 71699;
//      axios.get(`/productOverview/${id1}`)
//     .then((data) => {
//       this.setState({
//         name1 : data.data.styles[0].name,
//         original_price1 : data.data.styles[0].original_price,
//         photo1 : data.data.styles[0].photos[0].url,
//       });
//     })
//   }

//    getReviews() {
//      axios.get('/reviews', {
//       params: {
//         product_id: 71702,
//       }
//     })
//     .then((data) => {
//       let avgRating = 0;
//       if (data.data.results.length >= 0) {
//         for (let i = 0; i < data.data.results.length; i++) {
//           avgRating += data.data.results[i].rating;
//         }
//         avgRating = (avgRating / data.data.results.length * 2).toFixed() / 2;
//       }
//       this.setState({
//         rating1 : avgRating,
//       });
//     })
//      axios.get('/reviews', {
//       params: {
//         product_id: 71699,
//       }
//     })
//     .then((data) => {
//       let avgRating1 = 0;
//       if (data.data.results.length >= 0) {
//         for (let i = 0; i < data.data.results.length; i++) {
//           avgRating1 += data.data.results[i].rating;
//         }
//         avgRating1 = (avgRating1 / data.data.results.length * 2).toFixed() / 2;
//       }
//       this.setState({
//         rating2 : avgRating1,
//       });
//     })
//   }


//   showRating(input) {
//     return [...Array(5)].map((el, i) =>
//     i < input && i + 1 >  input ? (
//       <i key={i} className="fa fa-star-half-o" />
//     ) :
//     i <  input ? (
//       <i key={i} className="fa fa-star" />
//     ) : (
//       <i key={i} className="fa fa-star-o" />
//     )
//   );
//   }

//   toggle = () => {
//     let localLiked = this.state.liked;
//     localLiked = !localLiked;
//     this.setState({ liked: localLiked });
//   };

//   render () {
//     return (
//       <div>
//         RELATED PRODUCTS
//       <div
//         className="container"
//         onClick={() => this.toggle()}
//       >
//         {this.state.liked === false ? (
//          <i className="fa fa-star-o" />
//         ) : (
//           <i className="fa fa-star" />
//         )}
//       </div>
//       <div>
//      <img src={this.state.photo0} />
//      </div>
//      CATEGORY
//      <div>
//        {this.state.name0}
//      </div>
//      <div>
//        {this.state.original_price0}
//      </div>

//     { this.showRating(this.state.rating1)}
//     <div>
//     YOUR OUTFIT
//     </div>

//       <div
//         className="container"
//         onClick={() => this.toggle()}
//       >
//         {this.state.liked === false ? (
//          <i className="fa fa-times" />
//         ) : (
//           <i className="fa fa-times" />
//         )}
//       </div>
//       <div>
//      <img src={this.state.photo1} />
//      </div>
//      CATEGORY
//      <div>
//        {this.state.name1}
//      </div>
//      <div>
//        {this.state.original_price1}
//      </div>

//     { this.showRating(this.state.rating2)}
//   </div>
//     )
//   }

// }



