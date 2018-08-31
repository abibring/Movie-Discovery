const movieRouter = require('express').Router();
const movieController = require('./movieController.js');

movieRouter.route('/genre')
  .get(movieController.genres);
movieRouter.route('/latest')
  .get(movieController.latest);

module.exports = movieRouter;
