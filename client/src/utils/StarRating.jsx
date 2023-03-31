import React from 'react';
import starImg from '../../assets/star.png';

export default function StarRating({ productRatings, starWidth, starHeight }) {

  let ratings = productRatings.reduce((memo, val) => {
    memo.ratingsTotal = memo.ratingsTotal + (val[0] * val[1])
    memo.totalReviews = memo.totalReviews + Number(val[1])
    return memo
  }, {ratingsTotal: 0, totalReviews: 0})

  let avg = ratings.ratingsTotal / ratings.totalReviews

  function roundToQuarter(number)  {
    return parseFloat((Math.round(number * 4) / 4).toFixed(2))
  }

  let roundedAvg = roundToQuarter(avg);

  function generateStarWidths() {
    var widthsOfStars = [...Array(5)].map((rating, index) => {
      if (roundedAvg > 1) {
        roundedAvg = roundedAvg - 1;
        return 1;
      } else if (roundedAvg > 0) {
        var roundedDec = roundedAvg;
        roundedAvg = roundedAvg - roundedAvg;
        return roundedDec
      } else {
        return 0;
      }
    })
    return widthsOfStars;
  }

  var arrayOfWidths = generateStarWidths();
  return (
    <div>

      {arrayOfWidths.map((width, index) => {
        return (
          <div className='single-star-container-product' style={{height: `${starHeight}px`, width: `${starWidth}px`}} key={index}>
            <div className='single-star-fill-product' style={{'width': `${width * starWidth}px`, height: `${starHeight}px`}}>
              <img className='single-star-outline-product' src={starImg} style={{heigth: `${starHeight}px`, width: `${starWidth}px`}}></img>
            </div>
          </div>
        )
      })}

    </div>
  )


}