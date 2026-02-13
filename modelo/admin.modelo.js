import { db } from "../DB/turso.js"
import crypto from "node:crypto"
import bcrypt from 'bcrypt'


export class ModeloAdmin {

  static async obtenerTodos() {

    try {
      const resultado = await db.execute('SELECT * FROM medicos')

      return resultado.rows
    } catch (error) {
      console.error('Error al obtener los médicos:', error)
      throw error
    }
  }  

  static async obtenerPorId({ id }) {

    try {
      const resultado = await db.execute(
        'SELECT * FROM medicos WHERE id = ?', 
        [id]
    )

    return resultado.rows[ 0 ]

    } catch (error) {
      console.error('Error al obtener el médico por ID:', error)
      throw error
    }
  }

  static async crearMedico({ input }) {

    const { 
      nombre, 
      email, 
      password, 
      googletoken,
      roles,
    } = input

    const existing = await db.execute({
      sql: "SELECT id FROM medicos WHERE email = ?",
      args: [email],
    })

    if (existing.rows.length > 0) {
        throw new Error("Usuario ya registrado")
    }

    console.log(input)

    const uuid = crypto.randomUUID()

    const saltRounds = Number(process.env.SALT_ROUNDS)
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)


    try {
        const resultado = await db.execute(
        `INSERT INTO medicos (uuid, nombre, email, hashedPassword, googletoken, roles) VALUES (?, ?, ?, ?, ?, ?)`,
        [uuid, nombre, email, hashedPassword, googletoken, roles]
        )

        return uuid
    
    } catch (error) {
        console.error('Error al crear el médico:', error)
        throw error
    }

  }

  static async eliminarMedico({ uuid }) {

    try {
      const resultado = await db.execute(
        `DELETE FROM medicos WHERE uuid = ?`,
        [uuid]
      )
      console.log(resultado.rowsAffected)
      return resultado.rowsAffected


    } catch (error) {
      console.error('Error al eliminar el médico:', error)
      throw error
    }
  }

  static async actualizarMedico({ id, input }) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    if (fields.length === 0) return 0

    const sql = `
      UPDATE medicos
      SET ${fields.join(', ')}
      WHERE id = ?
    `

    values.push(id)

    try {

      const result = await db.execute(sql, values)
      return result.rowsAffected

    } catch (error) {
        console.error('Error al actualizar la cita:', error)
        throw error
      }
  }

}

