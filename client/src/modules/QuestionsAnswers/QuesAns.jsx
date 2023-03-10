import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import QuestionView from './QuestionView.jsx'
import AddQuesForm from './AddQuesForm.jsx'

const QuesAns = ({product, productId}) => {
  const [questionList, setQuestionList] = useState([]);
  const [questionToShow, setQuestionToShow] = useState(2);
  const [showQuesForm, setShowQuesForm] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const handleCloseQuesForm = () => setShowQuesForm(false);
  const handleShowQuesForm = () => setShowQuesForm(true);

  const getQuestionList = () => {
   axios.get(`/questions/${productId}`)
      .then((res) => {
        console.log('SUCESSFULLY GET BACK THE QUESTIONS LIST ', res.data);
        setQuestionList([...res.data.results]);
      })
      .catch((err) => {
        console.log('FAIL TO GET BACK THE QUESTIONS LIST', err);
      })
  }

  const showMoreQuestion = () => {
    setQuestionToShow(questionToShow + 2);
  }

  const handleChange = (e) => {
    //let filtered = [];
    //setSearchTerm(e.target.value);
    const searchWord = e.target.value
    console.log(" HERE IS WHAT USER SEARCH: ", searchWord);
    const newFilter = questionList.filter((question) => {
      return question.question_body.includes(searchWord)
    });

    if(searchWord.length >= 3) {
      setFiltered(newFilter);
      console.log("here is the result list: ", filtered);
    } else {
      getQuestionList();
    }
  }
  const handleSearch = () => {
    setQuestionList(filtered);
  }

  const updateQuestionHelpfulness = (id) => {
    axios.put(`/qa/questions/${id}/helpful`)
      .then((response) => {
        console.log('Successfully update question Helpfulness', response);
        getQuestionList();
      })
      .catch((err) => {
        console.log('Fail to update the question helpfulness', err);
      })
  }

  const updateAnsHelpfulness = (id) => {
    axios.put(`/qa/answers/${id}/helpful`)
      .then((response) => {
        console.log('Successfully update answer Helpfulness', response);
        getQuestionList();
      })
      .catch((err) => {
        console.log('Fail to update the answer helpfulness', err);
      })
  }

  const reportAnswer = (id) => {
    axios.put(`/qa/answers/${id}/report`)
      .then((response) => {
        console.log('Sucessfully report the answer', response);
        getQuestionList();
      })
      .catch((err) => {
        console.log('FAIL TO REPORT THE ANSWER', err);
      })
  }

  const addQuestion = (qbody, nickname, email, p_id) => {
    axios.post('/qa/questions', {
      body: qbody,
      name: nickname,
      email: email,
      product_id: p_id
    })
      .then((result) => {
        console.log('successfully post a question', result);
        handleCloseQuesForm();
        getQuestionList();
      })
      .catch((err) => {
        console.log('FAIL TO POST A QUESTION', err);
      })
  }

  const addAns = (ansBody, nickName, email, photos, qid) => {
    axios.post(`/qa/questions/${qid}/answers`, {
      data: {
        body: ansBody,
        name: nickName,
        email: email,
        rawPhotos: photos
      }
    })
      .then((result) => {
        console.log('successfully post answer for question', result);
        getQuestionList();
      })
      .catch((err) => {
        console.log('Fail to post an answer for question', err);
      })
  }

  useEffect(() => {
    getQuestionList();
  }, [])


  return(
    <div className="qaBackground">

      <span className="qatitle">Questions and Answers</span>
      <div>
        <input className="searchBox" type="search" placeholder="HAVE A QUESTIONS? SEARCH FOR ANSWERS..." onChange={handleChange} />
        <button className="searchButton" onClick={handleSearch}>Search</button>
      </div>


      <div className="questions">
        {questionList.slice(0, questionToShow).map(question =>
          <QuestionView key={question.question_id} question={question} product={product} updateQuestionHelpfulness={updateQuestionHelpfulness} updateAnsHelpfulness={updateAnsHelpfulness} reportAnswer={reportAnswer} addAns={addAns}/>
        )}
      </div>
      <div className="qaBottomButtons">
        {questionList.length > 2 ? <button className="qaButton" onClick={() => {showMoreQuestion()}}>MORE ANSWERED QUESTIONS</button> : null}
        <button className="qaButton" onClick={handleShowQuesForm}>ADD A QUESTION +</button>
        {showQuesForm && <AddQuesForm product={product} onHide={handleCloseQuesForm} addQuestion={addQuestion}/>}
      </div>
    </div>
  )
}

export default QuesAns;
