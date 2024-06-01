import express from 'express'
import { checkUsarName, login, register, upload } from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/register', upload.single('avatar'), register)
authRoutes.post('/login', login)
authRoutes.get('/check-username/:username', checkUsarName)

export default authRoutes
