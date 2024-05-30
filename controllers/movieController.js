import Movie from '../models/movies.js'

const createMovie = async (req, res) => {
  try {
    const movieData = req.body
    if (!movieData) {
      return res.status(404).json({ msg: 'movie data is missing' })
    }
    const existingMovie = await Movie.findOne({ title: movieData.title })

    if (existingMovie) {
      return res.status(400).json({ msg: 'Movie already exists:', existingMovie })
    }

    const newMovie = await Movie.create(movieData)
    res.status(201).json({ msg: 'film created:', newMovie })
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find({ isActive: true })
    res.status(200).json(movies)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getMovieById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }
  try {
    const movie = await Movie.findById({ _id: req.params.movieId, isActive: true })
    if (!movie) {
      return res.status(404).json({ msg: 'movie/film not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateMovieById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid movie ID' })
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
    if (!movie) {
      return res.status(404).json({ msg: 'movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteFilmById = async (req, res) => {
  if (!req.params.movieId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.movieId)
      if (!movie) {
        return res.status(404).json({ msg: 'film not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, { isActive: false }, { new: false })

    if (!movie || movie.isActive === false) {
      return res.status(404).json({ msg: 'film not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export {
  createMovie,
  getAllMovie,
  getMovieById,
  updateMovieById,
  deleteFilmById
}
