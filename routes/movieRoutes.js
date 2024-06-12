import express from 'express'
import { createMovie, deleteFilmById, getAllMovie, getMovieById, getMovieQuery, updateMovieById, getMovieIdVotes} from '../controllers/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const movieRoutes = express.Router()

movieRoutes.get('/search', getMovieQuery)
movieRoutes.get('/', getAllMovie)
movieRoutes.get('/vote-counts/:movieId', getMovieIdVotes)

movieRoutes.post('/', isAuth, isAdmin, createMovie)
movieRoutes.get('/:movieId', isAuth, isAdmin, getMovieById)
movieRoutes.patch('/:movieId', isAuth, updateMovieById)
movieRoutes.delete('/:movieId', isAuth, deleteFilmById)

export default movieRoutes
