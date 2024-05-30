import express from 'express'
import { createMovie, deleteFilmById, getAllMovie, getMovieById, updateMovieById } from '../controllers/movieController.js'

const movieRoutes = express.Router()

movieRoutes.post('/', createMovie)
movieRoutes.get('/', getAllMovie)
movieRoutes.get('/:movieId', getMovieById)
movieRoutes.patch('/:movieId', updateMovieById)
movieRoutes.delete('/:movieId', deleteFilmById)

export default movieRoutes
