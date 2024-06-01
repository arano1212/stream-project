import express from 'express'
import { getAllUser } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/', getAllUser)

export default userRoutes
