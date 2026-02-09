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
      const resultado =await db.execute(
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
    
  static async obtenerCitaPorId({id}) {
    
    try {

      const resultado = await db.execute('SELECT * FROM citas WHERE id = ?', [id])

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
        `DELETE FROM citas WHERE id = ?`,
        [id]
      )

      return resultado.rowsAffected

    } catch (error) {
      console.error('Error al eliminar la cita:', error);
      throw error
    }
  }

  static async actualizarCita({ id, input }) {

    const { nombre_paciente } = input

    try {
      const resultado = await db.execute(
        `UPDATE citas 
         SET nombre_paciente = ?
         WHERE id = ?`,
        [nombre_paciente, id]
      )
      return resultado.rowsAffected
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      throw error;
    }
  }

}