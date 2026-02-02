import { db } from '../../turso.js';

export class ModeloMedico {

   static async crearCita({ input }) {
    const { 
        fecha, 
        hora, 
        paciente, 
        motivo, 
        medicoId 
    } = input

    try {
      const [resultado] = await db.execute(
        `INSERT INTO citas (fecha, hora, paciente, motivo, medico_id) VALUES (?, ?, ?, ?, ?)`,
        [fecha, hora, paciente, motivo, medicoId]
      )
      return resultado.insertId

    } catch (error) {
      console.error('Error al crear la cita:', error);
      throw error;
    }


  }
    
  static async obtenerCitaPorId({id}) {
    const resultado = await db.execute('SELECT * FROM citas WHERE id = ?', [id]);
    return resultado.rows[0]; 
  }

  static async obtenerCitasPorMedico({medicoId}) {
    const resultado = await db.execute('SELECT * FROM citas WHERE medico_id = ?', [medicoId]);
    return resultado.rows;
  }

  static async eliminarCita({id}) {
    await db.execute(
      `DELETE FROM citas WHERE id = ?`,
      [id]
    )
  }

  static async actualizarCita({ id, input }) {

    const { 
        fecha, 
        hora, 
        paciente, 
        motivo, 
        medicoId 
    } = input

    const resultado = await db.execute(
      `UPDATE citas SET fecha = ?, hora = ?, paciente = ?, motivo = ?, medico_id = ? WHERE id = ?`,
      [fecha, hora, paciente, motivo, medicoId, id]
    )
  }

}