import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import User from './models/user.js'

dotenv.config()

mongoose.connect(process.env.DB_CONNECT_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err))

const populateUsers = async () => {
  try {
    await User.deleteMany({})

    const saltRounds = 10
    await User.insertMany([
      {
        email: 'sailor@gmail.com',
        password: await bcrypt.hash('123', saltRounds),
        username: 'sailor moon',
        role: 'basic'
      },
      {
        email: 'gumball@gmail.com',
        password: await bcrypt.hash('123', saltRounds),
        username: 'gumball watherson',
        role: 'basic'
      },
      {
        email: 'finn@gmail.com',
        password: await bcrypt.hash('123', saltRounds),
        username: 'finn el humano',
        role: 'basic'
      },
      {
        email: 'nezuko@gmail.com',
        password: await bcrypt.hash('123', saltRounds),
        username: 'nezuko demon',
        role: 'basic'
      },
      {
        email: 'galaptus@gmail.com',
        password: await bcrypt.hash('123', saltRounds),
        username: 'galaptus',
        role: 'admin'
      }

    ])

    console.log('Usuarios insertados con éxito')
  } catch (error) {
    console.error('Error al insertar usuarios:', error)
  } finally {
    await mongoose.disconnect()
  }
}

populateUsers()
