import { db } from "../DB/turso.js"

export class ModeloAuth {

    static async findByEmail(email) {
        const [rows] = await db.execute(
        'SELECT uuid, email, password, rol FROM users WHERE email = ?',
        [email]
        )

        return rows[0]
    } 
}
