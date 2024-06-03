import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../models/movies.js'

dotenv.config()

const DB_CONNECT_URI = process.env.DB_CONNECT_URI

const updateIsActive = async () => {
  try {
    await mongoose.connect(DB_CONNECT_URI)
    console.log('Connected to the database')

    const result = await Movie.updateMany({ isActive: 'true' }, { $set: { isActive: true } })
    console.log(`Updated ${result.modifiedCount} documents`)

    await mongoose.connection.close()
    console.log('Database connection closed')
  } catch (error) {
    console.error('Database connection error:', error)
  }
}

updateIsActive()
