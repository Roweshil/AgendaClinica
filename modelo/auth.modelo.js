import { db } from "../DB/turso.js"

export class ModeloAuth {

    static async buscarPorEmail (email) {

        console.log('Buscando usuario por email:', email)
        const result = await db.execute(
        'SELECT uuid, email, hashedPassword, roles FROM medicos WHERE email = ?',
        [email]
        )

        if (!result.rows.length) return null
        console.log('Resultado de la consulta:', result.rows[0])
        return result.rows[0]
    } 
}
