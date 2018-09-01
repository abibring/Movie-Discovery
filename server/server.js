const express = require('express');
const bodyParser = require('body-parser');
const { getGenres, getLatestMovies, getMoviesByGenre } = require('../helpers/apiHelpers.js');
const { save, get, remove } = require('./db/index.js');
// const movieRouter = require('./resources/movie/movieRouter.js');
// const routes = require('./resources/movie/movieRouter.js');
const J = require('circular-json');

const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.get('/genre', (req, res) => {
  getGenres()
    .then(({data}) => {
      console.log(`data in getGenres: ${JSON.stringify(data.genres)}`)
      res.status(200).send(data);
    })
    .catch((err) => {
      console.error(`err in server app.get genres: ${err}`);
      res.status(404).send(err);
    });
});

app.get('/genres', (req, res) => {
  let { genre } = req.query; 
  console.log(`GGG: ${genre}`);
  getMoviesByGenre(genre)
    .then(({data}) => {
      console.log(`results in app.get genres: ${JSON.stringify(data.results)}`)
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
      // console.log(`getLatestMovies server.js data.results: ${JSON.stringify(data.results)}`)
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(`movieRouter: ${err}`);
      res.status(404).send(err);
    });
});

app.post('/faves', (req, res) => {
  let { movie } = req.body;
  save(movie, (err, results) => {
    if (err) {
      console.log(`error in app.post faves server.js: ${err}`)
      res.status(404).send(err)
    } else {
      // console.log(`results in app.post to faves: ${JSON.stringify(results)}`)
      res.status(201).send(results);
    }
  })
})

app.get('/faves', (req, res) => {
  get((err, results) => {
    if (err) {
      console.error(`error in app.get to faves: ${err}`)
      res.status(404).send(err);
    } else {
      // console.log(`results in app.get: ${results}`)
      res.status(200).send(results);
    }
  })
});

app.delete('/delete', (req, res) => {
  console.log(`req.params in app.delete: ${J.stringify(req)}`);
  remove((req.params.movie), (err, results) => {
    if (err) {
      console.error(`err in app.delete: ${err}`)
      res.status(404).send(err);
    } else {
      res.status(204).send(results)
    }
  })
})


module.exports = app;
