import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { ModeloAuth } from '../modelo/auth.modelo.js'

export class AuthService {

  static async login({ input }) {

    const { email, password } = input

    const user =
      (await ModeloAuth.buscarPorAdmin(email)) ??
      (await ModeloAuth.buscarPorEmail(email))
      
    // uuid, email, password, rol
    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword)

    if (!isValid) {
      throw new Error('Credenciales inválidas')
    }

    const token = jwt.sign(
      { id: user.uuid, rol: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {
      token,
      user: {
        ok: "Autenticacion exitosa",
        email: user.email
        
      }
    }
  }

}