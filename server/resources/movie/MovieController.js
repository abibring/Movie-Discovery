 const axios = require('axios');
 const { getMoviesFromApiByGenre, getLatestMovies } = require('../../../helpers/apiHelpers.js');
 
 exports.genres = () => {
  axios.get('/genres', (req, res) => {
    getMoviesFromApiByGenre(req.body.genre)
      .then((resp) => console.log(`req in getMoviesFromApi: ${resp}`))
      .catch(err => console.error(err));
    });
};

exports.latest = () => {
  axios.get('/latest', (req, res) => {
    getLatestMovies()
      .then(({ data }) => {
        console.log(`resp in getLatestMovies router: ${data}`)
        res.send(data);
      })
      .catch(err => {
        console.error(`movieRouter: ${err}`);
        res.send(err);
      });
  });
};