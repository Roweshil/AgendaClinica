import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { ModeloAuth } from '../modelo/auth.modelo.js'

export class AuthService {

  static async login({ email, password }) {


    const user = await ModeloAuth.buscarPorEmail(email)
    // uuid, email, password, rol
    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword)

    if (!isValid) {
      throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign(
      { id: user.uuid, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {
      token,
      user: {
        id: user.uuid,
        email: user.email,
        rol: user.rol
      }
    }
  }

}