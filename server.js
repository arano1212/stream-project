import express from 'express'
// import { preloadMovies } from './config/database.js'
import { connect } from './config/database.js'
import movieRoutes from './routes/movieRoutes.js'
import authRoutes from './routes/authRoutes.js'
// import updateIsActive from './updateIsActive.js'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 3000

// preloadMovies()
connect()
// updateIsActive()

const api = express()
api.use(express.json())
api.use(cors())
api.use(morgan('tiny'))

api.use('/api/v1/', authRoutes)
api.use('/api/v1/movies', movieRoutes)
api.use('/api/v1/users', userRoutes)

api.listen(PORT, () => {
  console.log(`server is running en ${PORT}🚀`)
})
