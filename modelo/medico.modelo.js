import { db } from "../DB/turso.js";

export class ModeloMedico {

   static async crearCita({ input }) {
    const { 
        medicoId,
        fecha, 
        hora,
        paciente, 
        motivo,
    } = input

    try {
      const [resultado] = await db.execute(
        `INSERT INTO citas (fecha, hora, paciente, motivo, medico_id) 
          VALUES (?, ?, ?, ?, ?)`,
        [fecha, hora, paciente, motivo, medicoId]
      )

      return resultado.lastInsertRowid.toString()

    } catch (error) {
      console.error('Error al crear la cita:', error)
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

    const { 
        medicoId,
        fecha, 
        hora, 
        paciente, 
        motivo, 
         
    } = input

    try {
      const resultado = await db.execute(
        `UPDATE citas 
         SET medico_id = ?, fecha = ?, hora = ?, paciente = ?, motivo = ?  
         WHERE id = ?`,
        [medicoId, fecha, hora, paciente, motivo, id]
      )
      return resultado.rowsAffected

    } catch (error) {
      console.error('Error al actualizar la cita:', error);
      throw error;
    }
  }

}