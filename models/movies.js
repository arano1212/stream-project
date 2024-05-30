import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: String,
  popularity: Number,
  vote_average: Number,
  vote_count: Number,
  poster_path: String,
  original_language: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Movie', movieSchema, 'movies_catalog')
