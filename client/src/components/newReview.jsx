const React = require('react')
import Stars from './stars.jsx';
import Modal from './modal.jsx';
import NewPhotos from './newPhotos.jsx';

export default class NewReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {rating: null, recommends: null, characteristics: {
      size: null, width: null, comfort: null, quality: null, length: null, fit: null
    }, reviewSummaryValue: '', reviewBodyValue: '', emailValue: '', nickname: '', modalIsOpen: false, photos: []};
  }

  getStarCount(rating) {
    this.setState({'rating': rating})
    console.log('this.state.rating: ', this.state.rating);
  }

  captureRecommendInput(event) {
    console.log('event.target.value: ', event.target.value);
    this.setState({recommends: event.target.value});
    event.preventDefault();
  }

  captureSizeInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.size: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        size: event.target.value
      }
    }))
  }

  captureWidthInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.width: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        width: event.target.value
      }
    }))
  }

  captureComfortInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.comfort: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        comfort: event.target.value
      }
    }))
  }

  captureQualityInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.quality: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        quality: event.target.value
      }
    }))
  }

  captureLengthInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.length: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        length: event.target.value
      }
    }))
  }

  captureFitInput(event) {
    console.log('event.target.value: ', event.target.value);
    // this.setState({characteristics.fit: event.target.value});
    this.setState(prevState => ({
      characteristics: {
        ...prevState.characteristics,
        fit: event.target.value
      }
    }))
  }

  handleReviewSummaryChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nreviewSummary text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({reviewSummaryValue: event.target.value});
    }
  }

  handleReviewBodyChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nreviewBody text length: ', event.target.value.length)
    if (event.target.value.length <= 999) {
      this.setState({reviewBodyValue: event.target.value});
    }
  }

  handleEmailChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nemail text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({emailValue: event.target.value});
    }
  }

  handleNicknameChange(event) {
    console.log('event.target.value: ', event.target.value);
    console.log('\nnickname text length: ', event.target.value.length)
    if (event.target.value.length <= 59) {
      this.setState({nickname: event.target.value});
    }
  }

  savePhotos(photoList) {
    this.setState({'photos': photoList});
    console.log('this.state.photos: ', this.state.photos);
  }

  closeModal() {
    //close modal when submit button is clicked
    this.setState({modalIsOpen: false});
    //pass down as a prop to Modal
  }

  generateCharacteristicsInput(characteristicName, oneDescription, twoDescription) {
    var callback;

    if (characteristicName === 'Size') {
      callback = this.captureSizeInput.bind(this);
    } else if (characteristicName === 'Width') {
      callback = this.captureWidthInput.bind(this);
    } else if (characteristicName === 'Comfort') {
      callback = this.captureComfortInput.bind(this);
    } else if (characteristicName === 'Quality') {
      callback = this.captureQualityInput.bind(this);
    } else if (characteristicName === 'Length') {
      callback = this.captureLengthInput.bind(this);
    } else if (characteristicName === 'Fit') {
      callback = this.captureFitInput.bind(this);
    }

    return (
      <div onChange={callback}>
        <h5>{`${characteristicName}`}</h5>
        {[...Array(5)].map((input, index) => {
          index += 1;
          return (
            <span>
              <input type='radio' id={`${characteristicName}`} value={`${index}`} name={`${characteristicName}`} key={`${index}`}></input>
              <label for={`${characteristicName}`}>{`${index}`}</label>
            </span>
          )
        })}
        <p>{`1 = ${oneDescription}; 5 = ${twoDescription}`}</p>
      </div>
    )
  }

  validateInputFields() {
    var errorMessages = [];
    if (this.state.rating === undefined) {
      //this is a mandatory req
      var errorString = 'Rating is blank';
      errorMessages.push(errorString);
    }

    if (this.state.recommends === null) {
      //this is a mandatory req
      var errorString = 'Product recommendation is blank';
      errorMessages.push(errorString);
    }

    if (this.state.size === null) {
      var errorString = 'Size is blank';
      errorMessages.push(errorString);
    }

    if (this.state.fit === null) {
      var errorString = 'Fit is blank';
      errorMessages.push(errorString);
    }

    if (this.state.width === null) {
      var errorString = 'Width is blank';
      errorMessages.push(errorString);
    }

    if (this.state.comfort === null) {
      var errorString = 'Comfort is blank';
      errorMessages.push(errorString);
    }

    if (this.state.quality === null) {
      var errorString = 'Quality is blank';
      errorMessages.push(errorString);
    }

    if (this.state.length === null) {
      var errorString = 'Length is blank';
      errorMessages.push(errorString);
    }

    if (this.state.reviewBodyValue.length < 50) {
      //this is a mandatory req
      var errorString = 'Review body is less than the 50 character minimum';
      errorMessages.push(errorString);
    }
    if (this.state.emailValue.length === 0 || this.state.emailValue.indexOf('@') === -1 || this.state.emailValue.slice(0, this.state.emailValue.indexOf('@')).length === 0) {
      //this is a mandatory req
      var errorString = 'Email address is invalid';
      errorMessages.push(errorString);
    }

    if (this.state.nickname.length === 0) {
      //this is a mandatory req
      var errorString = 'Nickname is blank';
      errorMessages.push(errorString);
    }
    console.log('errorMessages');
    return errorMessages;
  }

  handleAddReviewSubmitClick() {
    //call validation function to see if all fields were correctly filled out
    var errorMessages = this.validateInputFields();
    console.log('errorMessages2: ', errorMessages);
    if (errorMessages.length > 0) {
      var errorString = '';
      errorMessages.forEach((errorMessage) => {
        errorString += errorMessage + '\n';
        return;
      })
      console.log('errorString: ', errorString);
      alert(`You must enter the following: \n${errorString}`);
      return;
    }
    //if so, continue

    //call an addNewReview function that takes in information from modal to make post call to API
    this.props.addNewReview(this.state);
    //call closeModal function
    this.props.closeModal();
  }

  render() {
    var reviewBodyCharCountMessage;
    var counter = 50 - this.state.reviewBodyValue.length
    if (counter > 0) {
      reviewBodyCharCountMessage = `Minimum required characters left: ${counter}`;
    } else {
      reviewBodyCharCountMessage = 'Minimum reached';
    }
    return (
      <div>
          <h2>Write Your Review</h2>
          <h3>About the [INSERT PRODUCT NAME HERE]</h3>
          <h4>Overall rating</h4>
          <div>
            <Stars starCount={this.getStarCount.bind(this)}/>
          </div>
          <h4>Do you recommend this product?</h4>
          <div onChange={this.captureRecommendInput.bind(this)}>
            <input type='radio' id='doesRecommend' value='Yes' name='recommends' Checked></input>
            <label for='doesRecommend'>Yes</label>
            <input type='radio' id='doesNotRecommend' value='No' name='recommends'></input>
            <label for='doesNotRecommend'>No</label>
          </div>
          <h4>Characteristics</h4>
          {this.generateCharacteristicsInput('Size', 'A size too small', 'A size too big')}
          {this.generateCharacteristicsInput('Width', 'Too narrow', 'Too wide')}
          {this.generateCharacteristicsInput('Comfort', 'Uncomfortable', 'Perfect')}
          {this.generateCharacteristicsInput('Quality', 'Poor', 'Perfect')}
          {this.generateCharacteristicsInput('Length', 'Runs Short', 'Runs Long')}
          {this.generateCharacteristicsInput('Fit', 'Runs tight', 'Runs long')}
          <h4>Review summary</h4>
            <form onSumbit={this.handleAddReviewSubmitClick.bind(this)}>
              <textarea placeholder='Example: Best purchase ever!' value={this.state.reviewSummaryValue} onChange={this.handleReviewSummaryChange.bind(this)}>
              </textarea>
            </form>
          <h4>Review body</h4>
            <form onSumbit={this.handleAddReviewSubmitClick.bind(this)}>
                <textarea placeholder='Why did you like the product or not?' value={this.state.reviewBodyValue} onChange={this.handleReviewBodyChange.bind(this)}>
                </textarea>
            </form>
            <p>{reviewBodyCharCountMessage}</p>
          <h4>Upload your photos</h4>
          <NewPhotos savePhotos={this.savePhotos.bind(this)}/>
          <h4>What is your nickname</h4>
            <form onSubmit={this.handleAddReviewSubmitClick.bind(this)}>
                <input type="text" placeholder='Example: jackson11!' value={this.state.nickname} onChange={this.handleNicknameChange.bind(this)}></input>
                <p>For privacy reasons, do not use your full name or email address</p>
            </form>
          <h4>Your email</h4>
            <form onSubmit={this.handleAddReviewSubmitClick.bind(this)}>
                <input type="text" placeholder='Example: jackson11@email.com' value={this.state.emailValue} onChange={this.handleEmailChange.bind(this)}></input>
                <p>For authentication reasons, you will not be emailed</p>
            </form>
          <button onClick={this.handleAddReviewSubmitClick.bind(this)}>Submit review</button>
      </div>
    )
  }
}