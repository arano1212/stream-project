import express from 'express'
import { deleteUserById, getAllUser, getUserById, getUserQuery, updateUserById, upload } from '../controllers/userController.js'
import { isAdmin } from '../middlewares/isAdmin.js'
import { isAuth } from '../middlewares/isAuth.js'

const userRoutes = express.Router()

userRoutes.get('/', isAuth, isAdmin, getAllUser)
userRoutes.get('/search', isAuth, isAdmin, getUserQuery)
userRoutes.get('/:userId', isAuth, isAdmin, getUserById)
userRoutes.patch('/:userId', isAuth, isAdmin, upload.single('avatar'), updateUserById)
userRoutes.delete('/:userId', isAuth, isAdmin, deleteUserById)

export default userRoutes
