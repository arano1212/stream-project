import axios from 'axios'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Movie from '../models/movies.js'

dotenv.config()

const connect = () => {
  mongoose.connect(process.env.DB_CONNECT_URI)

  const { connection } = mongoose

  connection.on('open', () => {
    console.log('database connection stableshed')
  })

  connection.on('error', (error) => {
    console.log('database connection error', error)
  })
}

export { connect }
