const axios = require('axios');
const { API_KEY } = require('../config.js');

const getGenres = () => {
  let queryString = { api_key: API_KEY, language: 'en-US'}
 return axios.get(`https://api.themoviedb.org/3/genre/movie/list`, { params: queryString });
}

const getLatestMovies = () => {
  let queryString = { api_key: API_KEY, language: 'en-US'};
  return axios.get(`https://api.themoviedb.org/3/movie/upcoming`, { params: queryString })
};

const getMoviesByGenre = (genre) => {
  console.log(`genre in getMoviesByGenre apiHelper: ${genre}`);
  let queryString = { with_genres: genre, include_adult: false, sort_by: 'release_date.asc', language: 'en-US', apy_key: API_KEY};
  return axios.get(`http://api.themoviedb.org/3/discover/movie?with_genres=${genre}&include_adult=false&sort_by=release_date.asc&language=en-US&api_key=${API_KEY}`)
};

module.exports = { getGenres, getLatestMovies, getMoviesByGenre };

