import express from 'express'
import { login, register, upload } from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/register', upload.single('avatar'), register)
authRoutes.post('/login', login)

export default authRoutes
