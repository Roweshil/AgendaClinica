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

  static async obtenerPorId({ uuid }) {

    try {
      const resultado = await db.execute(
        'SELECT uuid, nombre, email, roles FROM medicos WHERE uuid = ?', 
        [uuid]
    )

      return resultado.rows[0]


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
      roles = 'medico'
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
        console.error('Error al crear el médico m:', error)
        throw error
    }

  }

  static async actualizarContraseña ({ uuid, newPassword }) {

    const saltRounds = Number(process.env.SALT_ROUNDS)
    
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    try {
        const resultado = await db.execute(
          `UPDATE medicos SET hashedPassword = ? WHERE uuid = ?`,
          [hashedPassword, uuid]
        )

        return uuid
    
    } catch (error) {
        console.error('Error al actualizar contraseña del médico:', error)
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

  static async actualizarMedico({ uuid, input }) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    console.log(input)

    if (fields.length === 0) return 0

    const sql = `
      UPDATE medicos
      SET ${fields.join(', ')}
      WHERE uuid = ?
    `

    values.push(uuid)

    try {

      const result = await db.execute(sql, values)
      return uuid

    } catch (error) {
        console.error('Error al actualizar el médico:', error)
        throw error
      }
  }

}

