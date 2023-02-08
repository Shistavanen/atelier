import React from 'react'
import starImg from '../../../../assets/star.png';

export default function StarRating(props) {

  let ratings = props.reviews.reduce((memo, val) => {
    memo.ratingsTotal = memo.ratingsTotal + (val[0] * val[1])
    memo.totalReviews = memo.totalReviews + Number(val[1])
    return memo
  }, {ratingsTotal: 0, totalReviews: 0})

  let avg = ratings.ratingsTotal / ratings.totalReviews

  function roundToQuarter(number)  {
    return parseFloat((Math.round(number * 4) / 4).toFixed(2))
  }

  let roundedAvg = roundToQuarter(avg)

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

  function generateStarsFromRating() {
    var arrayOfWidths = generateStarWidths();
    console.log('arrayOfWidths: ', arrayOfWidths);
    return (
    <div id='overviewQuarterStars'>

      {arrayOfWidths.map((width, index) => {
        return (
        <div className='single-star-container-overview' key={index}>
          <div className='single-star-fill-overview' style={{'width': (width * 21).toString() + 'px'}}>
            <img className='single-star-outline-overview' src={starImg}></img>
          </div>
        </div>
        )
      })}

    </div>
    )
  }

  return (
    <div>
      {generateStarsFromRating()}
      <a href='#ratingsAndReviews'><small>Read all {ratings.totalReviews} reviews</small></a>
    </div>
  )
}