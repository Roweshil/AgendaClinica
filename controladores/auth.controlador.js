import { ModeloAuth } from "../modelo/auth.modelo.js";

export class AuthController {
    static async login (req, res) {
        await console.log("intento de acceso try");    

        return res.status(200).json({ message: "Login successful" });
    }
    
}