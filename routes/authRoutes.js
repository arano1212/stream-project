import express from 'express'
import { register, upload} from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/register', upload.single('avatar') , register)

export default authRoutes
