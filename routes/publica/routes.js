import { Router } from "express"
import { AuthController } from "../../controladores/auth.controlador.js"

const authRouter = Router()


// Rutas Publicas

authRouter.post('/login', AuthController.login)

authRouter.post('/logout', AuthController.logout)

export default authRouter





// (Deshabilitadas temporalmente para pruebas)

 //authRouter.post('/register', AuthController.register)
