import { AuthService } from "../Services/authService.js";
import { validateAuth } from "../schemas/auth.schema.js";


export class AuthController {
   static async login(req, res) {

        const result = validateAuth(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        try {

            const { token, user } = await AuthService.login({ input: result.data })    
            res
            .cookie('access_token', token, {
                httpOnly: true, // solo se puede acceder en el servidor
                secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
                sameSite: 'strict',  //la cookie solo se puede acceder en el mismo dominio
                maxAge: 3600000 // validez durante 1 hora
            })
            .json({ user })

        } catch (error) {
                res.status(401).json({ error: error.message })
            }
    }

    static logout(req, res) {
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        })

        res.json({ message: 'Logout exitoso' })
    }
    
}