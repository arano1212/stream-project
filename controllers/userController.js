import User from '../models/user.js'

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ error: error.message })
  }
}

export {
  getAllUser
}
