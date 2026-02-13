import jwt from 'jsonwebtoken'

import { ModeloAuth } from '../modelo/auth.modelo.js'

export class AuthService {
  static async login({ email, password }) {

    const user = await ModeloAuth.findByEmail(email)
    // uuid, email, password, rol
    if (!user) {
      throw new Error('Credenciales inválidas')
    }

    const isValid = await bcrypt.compare(password, user.password)

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

  /*static async register({ usuario, password }) {
    
    const { user, password } = req.body // cuerpo de la peticion
    console.log(req.body)

    try {
        const id = await ModeloAuth.create(user, password)
        res.json({ id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

  }*/
}