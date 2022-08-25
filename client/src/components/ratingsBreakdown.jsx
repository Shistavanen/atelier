const React = require('react')

export default class RatingsBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  calculateNearestQuarter(num) {
    var int = Math.trunc(num);
    var dec = num - int;
    var result = 0;

    if (dec >= 0 && dec < 0.125) {
      result = int + 0;
    } else if (dec >= 0.125 && dec < 0.375) {
      result = int + 0.25;
    } else if (dec >= 0.375 && dec < 0.625) {
      result = int + 0.5;
    } else if (dec >= 0.625 && dec < 0.875) {
      result = int + 0.75;
    } else if (dec >= 0.875 && dec < 1) {
      result = int + 1;
    }

    return result;

  }

  calculateNearestTenth(num) {
    var int = Math.trunc(num);
    var dec = num - int;
    var result = 0;

    if (dec >= 0 && dec < 0.05) {
      result = int + 0;
    } else if (dec >= 0.05 && dec < 0.15) {
      result = int + 0.1;
    } else if (dec >= 0.15 && dec < 0.25) {
      result = int + 0.2;
    } else if (dec >= 0.25 && dec < 0.35) {
      result = int + 0.3;
    } else if (dec >= 0.35 && dec < 0.45) {
      result = int + 0.4;
    } else if (dec >= 0.45 && dec < 0.55) {
      result = int + 0.5;
    } else if (dec >= 0.55 && dec < 0.65) {
      result = int + 0.6;
    } else if (dec >= 0.65 && dec < 0.75) {
      result = int + 0.7;
    } else if (dec >= 0.75 && dec < 0.85) {
      result = int + 0.8;
    } else if (dec >= 0.85 && dec < 0.95) {
      result = int + 0.9;
    } else if (dec >= 0.95 && dec < 1) {
      result = int + 1;
    }

    return result;

  }

  getCountOfRatings() {
    var ratings = this.props.ratings;
    var count = (ratings['1'] + ratings['2'] + ratings['3'] + ratings['4'] + ratings['5']);
    return count;
  }

  calculateAvgRating(roundToQuarter) {
    var ratings = this.props.ratings;
    var sum = 0;
    var count = 0;

    for (var key in ratings) {
      ratings[key] = parseInt(ratings[key]);
      sum += ratings[key] * parseInt(key);
    }

    count = this.getCountOfRatings();
    var average = sum / count;

    if (roundToQuarter === true) {
      average = this.calculateNearestQuarter(average);
    } else {
      average = this.calculateNearestTenth(average);
    }

    // console.log('count: ', count);
    // console.log('sum: ', sum);
    // console.log('average: ', average);

    return average;
  }

  generateStarsFromRating() {
    var average = this.calculateAvgRating(true);
    var stars =
    <div className='rating'>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              className={`starButton ${index <= average ? 'on' : 'off'}`}
              type="button"
              key={index}
              >
              <span>&#9733;
              </span>
            </button>
          );
        })}
      </div>
    return stars;
  }

  getRatingsBreakdown() {
    var ratings = this.props.ratings;

    var counter = 6;
    var rows = [...Array(5)].map((row, index) => {
      counter--;
      return (
        <div id={`${counter}stars`}>
          <div className='side' key={index}>
            <div>{counter} stars</div>
          </div>
          <div className='middle'>
            <div className='bar-container'>
              <div className={`bar-${counter}`}></div>
            </div>
          </div>
          <div className='side right'>
            <div>{ratings[counter]}</div>
          </div>
        </div>
      )
    })
    return rows;
  }
  render() {
    return (
      <div id='ratingSummary'>
        <h3>RATINGS &amp; REVIEWS</h3>
        <h1>{this.calculateAvgRating()}</h1>
        {this.generateStarsFromRating()}
        <p>based on {this.getCountOfRatings()} reviews</p>
        <div id='ratingBreakdown'>
          <div className='row'>
            {this.getRatingsBreakdown()}
          </div>
        </div>
      </div>
    )
  }
}
