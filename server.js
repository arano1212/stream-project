import express from 'express'
// import { preloadMovies } from './config/database.js'
import { connect } from './config/database.js'
import movieRoutes from './routes/movieRoutes.js'
// import updateIsActive from './updateIsActive.js'

const PORT = process.env.PORT || 3000

//preloadMovies()
connect()
// updateIsActive()

const api = express()
api.use(express.json())

api.use('/api/v1/movies', movieRoutes)

api.listen(PORT, () => {
  console.log(`server is running en ${PORT}🚀`)
})
