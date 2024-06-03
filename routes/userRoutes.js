import express from 'express'
import { deleteUserById, getAllUser, getUserById, updateUserById } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/', getAllUser)
userRoutes.get('/:userId', getUserById)
userRoutes.patch('/:userId', updateUserById)
userRoutes.delete('/:userId', deleteUserById)

export default userRoutes
