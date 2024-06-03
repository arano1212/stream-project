import axios from 'axios'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../models/movies.js'

dotenv.config()

const DB_CONNECT_URI = process.env.DB_CONNECT_URI
const API_KEY = process.env.API_KEY

async function fetchMovies () {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    return response.data.results
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

async function preloadMovies () {
  try {
    await mongoose.connect(DB_CONNECT_URI)
    console.log('Connected to MongoDB 🍃')

    const movies = await fetchMovies()
    if (movies.length > 0) {
      await Movie.deleteMany({})
      await Movie.insertMany(movies)
      console.log('Movies preloaded successfully 🌨️ ')
    }

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error preloading movies:', error)
  }
}

preloadMovies()
