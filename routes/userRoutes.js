import express from 'express'
import { deleteUserById, getAllUser, getUserById, getUserQuery, updateUserById, upload } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.get('/', getAllUser)
userRoutes.get('/search', getUserQuery)
userRoutes.get('/:userId', getUserById)
userRoutes.patch('/:userId', upload.single('avatar') , updateUserById)
userRoutes.delete('/:userId', deleteUserById)

export default userRoutes
