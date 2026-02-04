import { db } from "../DB/turso.js";

export class ModeloAuth {

    static async login() {
        // Métodos relacionados con la autenticación y autorización
        await console.log("Login attempt");
        return console.log("Login successful");
    }
}