import express from 'express'
import { createMovie, deleteFilmById, getAllMovie, getMovieById, getMovieQuery, updateMovieById } from '../controllers/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'

const movieRoutes = express.Router()

movieRoutes.post('/', createMovie)
movieRoutes.get('/search', getMovieQuery)
movieRoutes.get('/', getAllMovie)
movieRoutes.get('/:movieId', getMovieById)
movieRoutes.patch('/:movieId', isAuth, updateMovieById)
movieRoutes.delete('/:movieId', deleteFilmById)

export default movieRoutes
