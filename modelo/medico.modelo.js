import { db } from "../DB/turso.js";

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
    try {
      const resultado = await db.execute(
        `INSERT INTO citas (medico_id, fecha, hora, paciente, motivo, google_event_id, estado) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [medico_Id, fecha, hora, paciente, motivo, google_event_id, estado]
      )
    
      return resultado.lastInsertRowid.toString()
    
    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }
  }
    
  static async obtenerPorId({id}) {
    
    try {

      const resultado = await db.execute('SELECT * FROM citas WHERE id_cita = ?', [id])

      return resultado.rows[0]; 

    } catch (error) {
      console.error('Error al obtener la cita por ID:', error)
      throw error
    }
  }

  static async obtenerCitasPorMedico({medicoId}) {

    try {
      const resultado = await db.execute('SELECT * FROM citas WHERE medico_id = ?', [medicoId])

      return resultado.rows
      
    } catch (error) {
      console.error('Error al obtener las citas por médico:', error)
      throw error
    }  
  }

  static async eliminarCita({id}) {
    
    try {
      const resultado = await db.execute(
        `DELETE FROM citas WHERE id_cita = ?`,
        [id]
      )

      return resultado.rowsAffected

    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error
    }
  }

  static async actualizarCita({ id, input }) {
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
      WHERE id_cita = ?
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
