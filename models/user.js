import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /\S+@\S+\.\S+/.test(email)
      },
      message: props => `${props.value} no es un correo electronico valido`
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar: { type: String },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

export default mongoose.model('User', userSchema)
