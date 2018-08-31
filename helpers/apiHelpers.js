const axios = require('axios');
const { API_KEY} = require('../config.js');

const getMovieGenres = (genre) => {
  let queryString = { api_key: API_KEY, language: 'en-US'}
 return axios.get(`https://api.themoviedb.org/3/genre/movie/list`, { params: queryString });
}

const getLatestMovies = () => {
  let queryString = { api_key: API_KEY, language: 'en-US'};
  return axios.get(`https://api.themoviedb.org/3/movie/upcoming`, { params: queryString })
};

const getMoviesByGenre = (genre) => {
  console.log(`genre in getMoviesByGenre apiHelper: ${genre}`)
}

module.exports = { getMovieGenres, getLatestMovies, getMoviesByGenre };

