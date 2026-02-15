import { db } from "../DB/turso.js"
import crypto from "node:crypto"

export class ModeloMedico {

   static async crearCita({ input }) {
    const { 
        medico_Id,
        fecha, 
        hora,
        paciente, 
        motivo,
        google_event_id,
        estado,
    } = input

    
    console.log(input);

    const uuid = crypto.randomUUID()

    try {
      const resultado = await db.execute(
        `INSERT INTO citas (uuid, medico_id, fecha, hora, paciente, motivo, google_event_id, estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [uuid, medico_Id, fecha, hora, paciente, motivo, google_event_id, estado]
      )
    
      return uuid
    
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  }
    
  static async obtenerCitaPorId({uuid}) {
    
    try {

      const resultado = await db.execute('SELECT * FROM citas WHERE uuid = ?', [uuid])

      return resultado.rows[0]; 

    } catch (error) {
      console.error('Error al obtener la cita por ID:', error)
      throw error
    }
  }

  static async obtenerCitasPorMedico({uuid}) {

    try {
      const resultado = await db.execute('SELECT * FROM citas WHERE medico_id = ?', [uuid])

      return resultado.rows
      
    } catch (error) {
      console.error('Error al obtener las citas por médico:', error)
      throw error
    }  
  }

  static async eliminarCita({uuid}) {
    
    try {
      const resultado = await db.execute(
        `DELETE FROM citas WHERE uuid = ?`,
        [uuid]
      )

      return resultado.rowsAffected

    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error
    }
  }

  static async actualizarCita({ uuid, input }) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(input)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    if (fields.length === 0) return 0

    const sql = `
      UPDATE citas
      SET ${fields.join(', ')}
      WHERE uuid = ?
    `

    values.push(uuid)

    try {

      const result = await db.execute(sql, values)

      return uuid 

    } catch (error) {
        console.error('Error al actualizar la cita:', error)
        throw error
      }
  }
  
}
