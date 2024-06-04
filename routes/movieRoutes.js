import express from 'express'
import { createMovie, deleteFilmById, getAllMovie, getMovieById, getMovieQuery, updateMovieById } from '../controllers/movieController.js'
import { isAuth } from '../middlewares/isAuth.js'
import { isAdmin } from '../middlewares/isAdmin.js'

const movieRoutes = express.Router()

movieRoutes.post('/', isAuth, isAdmin, createMovie)
movieRoutes.get('/search', getMovieQuery)
movieRoutes.get('/', getAllMovie)
movieRoutes.get('/:movieId', isAuth, isAdmin, getMovieById)
movieRoutes.patch('/:movieId', isAuth, isAdmin, updateMovieById)
movieRoutes.delete('/:movieId', isAuth, deleteFilmById)

export default movieRoutes
