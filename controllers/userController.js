import User from '../models/user.js'
import multer from 'multer'
import { tmpdir } from 'os'
import { v2 as cloudinary } from 'cloudinary'

const storage = multer.diskStorage({
  destination: tmpdir(),
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY2,
  api_secret: process.env.API_SECRET
})

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const getUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid user ID' })
  }
  try {
    const user = await User.findById({ _id: req.params.userId, isActive: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

const updateUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }

  try {
    const updateData = { ...req.body }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      updateData.avatar = result.secure_url
    }
    const user = await User.findByIdAndUpdate(req.params.userId, updateData, { new: true })
    if (!user) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteUserById = async (req, res) => {
  if (!req.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ msg: 'invalid housing ID' })
  }

  if (req.query.destroy === 'true') {
    try {
      const user = await User.findByIdAndDelete(req.params.userId)
      if (!user) {
        return res.status(404).json({ msg: 'user not found' })
      }
      return res.status(204).json()
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isActive: false }, { new: false })

    if (!user || user.isActive === false) {
      return res.status(404).json({ msg: 'user not found' })
    }
    res.status(204).json()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getUserQuery = async (req, res) => {
  const querysDB = { isActive: true }

  const queryKeys = ['email', 'username']

  queryKeys.forEach(key => {
    if (req.query[key]) {
      querysDB[key] = { $regex: new RegExp(req.query[key], 'i') }
    }
  })

  try {
    const users = await User.find(querysDB)
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: 'users not found' })
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export {
  getAllUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserQuery,
  upload
}
