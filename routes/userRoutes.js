import express from 'express'
import { deleteUserById, getAllUser, getUserById, getUserQuery, updateUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/', getAllUser)
userRoutes.get('/search', getUserQuery)
userRoutes.get('/:userId', getUserById)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUserById)

export default userRoutes
