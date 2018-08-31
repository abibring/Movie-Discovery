const express = require('express');
const bodyParser = require('body-parser');
// const routes = require('./resources/movie/movieRouter.js');
const { getGenres, getLatestMovies, getMoviesByGenre } = require('../helpers/apiHelpers.js');
// const movieRouter = require('./resources/movie/movieRouter.js');
const { save, get } = require('./db/index.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/genre', (req, res) => {
  getGenres()
    .then(({data}) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(`err in server app.get genres: ${err}`);
      res.status(404).send(err);
    });
});

app.get('/genres', (req, res) => {
  let { genre } = req.query; 
  getMoviesByGenre(genre)
    .then(({data}) => {
      res.status(200).send(data.results)
    })
    .catch(err => {
      console.error(`err in app.get.genres: ${err}`);
      res.status(404).send(err);
    });
});

app.get('/latest', (req, res) => {
  getLatestMovies()
    .then(({ data }) => {
      res.status(200).send(data);
    })
    .catch(err => {
      // console.error(`movieRouter: ${err}`);
      res.status(404).send(err);
    });
});

app.post('/faves', (req, res) => {
  let { movie } = req.body;
  save(movie, (err, results) => {
    if (err) {
      console.log(`errrrrrr: ${err}`)
      res.status(404).send(err)
    } else {
      console.log(`results in app.post to faves: ${JSON.stringify(results)}`)
      res.status(201).send(results);
    }
  })
})

app.get('/faves', (req, res) => {
  console.log('1')
  get((err, data) => {
    if (err) {
      console.error(`error in app.get to faves: ${err}`)
      res.status(404).send(err);
    } else {
      console.log(`data in app.get: ${data}`)
      res.status(200).send(data);
    }
  })
})


module.exports = app;
