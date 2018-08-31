const express = require('express');
const bodyParser = require('body-parser');
// const routes = require('./resources/movie/movieRouter.js');
const { getMovieGenres, getLatestMovies } = require('../helpers/apiHelpers.js');
const movieRouter = require('./resources/movie/movieRouter.js');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/genre', (req, res) => {
  getMovieGenres()
    .then(({data}) => {
      console.log(`req in getMoviesFromApi: ${data}`);
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(`err in server app.get genres: ${err}`);
      res.status(404).send(err);
    });
});

app.get('/latest', (req, res) => {
  getLatestMovies()
    .then(({ data }) => {
      // console.log(`resp in getLatestMovies router: ${data}`);
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(`movieRouter: ${err}`);
      res.status(404).send(err);
    });
});

app.get('/genres', (req, res) => {

})

module.exports = app;
