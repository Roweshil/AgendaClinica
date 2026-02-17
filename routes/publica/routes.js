import { Router } from "express"
import { AuthController } from "../../controladores/auth.controlador.js"
import rateLimit from 'express-rate-limit'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiados intentos, intenta más tarde' }
})

const authRouter = Router()


// Rutas Publicas

authRouter.post('/login', loginLimiter, AuthController.login)

authRouter.post('/logout', AuthController.logout)

export default authRouter





// (Deshabilitadas temporalmente para pruebas)

 //authRouter.post('/register', AuthController.register)
