import { AuthService } from "../Services/authService.js";
const SECRET_JWT_KEY = process.env.SECRET


export class AuthController {
   static async login(req, res) {

        const { email, password } = req.body
        console.log(req.body)

        try {

            const { user, token } = await AuthService.login({ email, password })    // cuerpo de la peticion
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

    static async register(req, res) {
        const { username, password } = req.body // cuerpo de la peticion
        console.log(req.body)

        try {
            const id = await ModeloAuth.register(username, password)
            res.json({ id })
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async logout(req, res) {
        res.clearCookie('access_token')
        res.send('Logout endpoint')
    }
    
}