require('dotenv').config();
const { PORT, APIKEY } = process.env
const BASEURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'

const axios = require('axios')
const path = require('path')
const compression = require('compression');
const createPhotoURL = require('./helper/createPhotoURLs.js');
const { getProductId, getQuestionsList } = require('./helper/questionAPI.js')

const express = require('express')
const app = express();


app.use(compression());
app.use(express.static(path.join(__dirname, '/../client/dist')))
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit : '1000kb'}))

app.post('/interactions', (req, res) => {
  let interactions = req.body
  axios.post(`${BASEURL}/interactions`, interactions, {headers: {Authorization: APIKEY}})
    .then(results => {
      res.status(201).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/products', (req, res) => {
  axios.get(`${BASEURL}/products/`, {headers: {'Authorization': APIKEY}})
    .then(results => {
      res.status(200).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/productOverview/:product_id', (req, res) => {
  let id = req.params.product_id
  const productInfo = {};

  idRequest = axios.get(`${BASEURL}/products/${id}`, {headers: {'Authorization': APIKEY}});
  stylesRequest = axios.get(`${BASEURL}/products/${id}/styles`, {headers: {'Authorization': APIKEY}})
  reviewsRequest = axios.get(`${BASEURL}/reviews/meta`, {headers: {'Authorization': APIKEY}, params: {product_id: id}})

  Promise.all([idRequest, stylesRequest, reviewsRequest])
    .then(results => {
      productInfo.features = results[0].data.features
      productInfo.styles = results[1].data.results
      productInfo.reviews = results[2].data.ratings
      res.status(200).send(productInfo)
    })
    .catch(err => {
      console.log(err)
    })
})

app.post('/cart', (req, res) => {
  let skuId = req.body
  axios.post(`${BASEURL}/cart`, skuId, {headers: {Authorization: APIKEY}})
    .then(results => {
      res.status(201).send(results.data)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('/reviews', (req, res) => {
  axios.get(`${BASEURL}/reviews`, {
    headers: {'Authorization': APIKEY},
    params: req.query
  })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})

app.post('/reviews', (req, res, next) => {
  createPhotoURL(req, res, next)
    .then(() => {
        axios.post(`${BASEURL}/reviews`, req.body.data, {
        headers: { 'Authorization': APIKEY }
      })
        .then((response) => {
          res.status(201).send('Created');
        })
        .catch((err) => { throw err; })
    })
    .catch((err) => { throw err; })
})

app.get('/reviews/meta', (req, res) => {
  axios
    .get(`${BASEURL}/reviews/meta`, {
      headers: {'Authorization': APIKEY},
      params: req.query
    })
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => { throw err; });
})

app.put('/reviews/:review_id/helpful', (req, res) => {
  var pathParam = req.params.review_id;
  axios
    .put(`${BASEURL}/reviews/${pathParam}/helpful`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => { throw err; });
})

app.get('/questions/:product_id', (req , res) => {
  let id = req.params.product_id;
  axios.get(`${BASEURL}/qa/questions?product_id=${id}&count=50`, {
    headers: {
      'Authorization': APIKEY
    }
  })
    .then(result => {
      res.status(200).send(result.data);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

app.post('/qa/questions/:question_id/answers', (req, res, next) => {
  let questionId = req.params.question_id;
  createPhotoURL(req, res, next)
    .then(() => {
      axios.post(`${BASEURL}/qa/questions/${questionId}/answers`, req.body.data, {headers: {'Authorization': APIKEY}})
        .then((response) => {
          res.status(201).send('Created');
        })
        .catch((err) => {
          res.status(500).send(err);
        })
    })
})

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let questionId = req.params.question_id;
  axios.put(`${BASEURL}/qa/questions/${questionId}/helpful`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let ansId = req.params.answer_id;
  axios.put(`${BASEURL}/qa/answers/${ansId}/helpful`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let ansId = req.params.answer_id;
  axios.put(`${BASEURL}/qa/answers/${ansId}/report`, {}, {headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(204).send('success');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})

app.post('/qa/questions', (req, res) => {
  axios.post(`${BASEURL}/qa/questions`, req.body, { headers: {'Authorization': APIKEY}})
    .then((response) => {
      res.status(201).send('Created');
    })
    .catch((err) => {
      res.status(500).send(err);
    })
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})