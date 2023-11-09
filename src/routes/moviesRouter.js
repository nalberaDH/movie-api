const express = require('express');

const { listAllMovies, getMovieById, getMoviesByGenre } = require('../controllers/moviesController');

const router = express.Router();


router.get('/movies', listAllMovies);
router.get('/movie/:id', getMovieById);
router.get('/movies/genre', getMoviesByGenre);

module.exports = router;