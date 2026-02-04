import { db } from "../DB/turso.js";

export class ModeloAdmin {

  static async obtenerTodos() {

    try {
      const resultado = await db.execute(
        'SELECT * FROM medicos'
    )

    return resultado.rows;

    } catch (error) {
      console.error('Error al obtener los médicos:', error);
      throw error;
    }
  }  

  static async obtenerPorId({ id }) {

    try {
      const resultado = await db.execute(
        'SELECT * FROM medicos WHERE id = ?', 
        [id]
    )

    return resultado.rows[ 0 ];

    } catch (error) {
      console.error('Error al obtener el médico por ID:', error);
      throw error;
    }
  }

  static async crearMedico({ input }) {

    const { 
      nombre, 
      email, 
      password, 
      googletoken 
    } = input

    try {
        const resultado = await db.execute(
        `INSERT INTO medicos (nombre, email, password, googletoken) VALUES (?, ?, ?, ?)`,
        [nombre, email, password, googletoken]
        )

        return resultado.lastInsertRowid.toString()
    
    } catch (error) {
        console.error('Error al crear el médico:', );
        throw error;
    }

  }

  static async eliminarMedico({ id }) {

    try {
      const resultado = await db.execute(
        `DELETE FROM medicos WHERE id = ?`,
        [id]
      )
      console.log(resultado.rowsAffected);
      return resultado.rowsAffected


    } catch (error) {
      console.error('Error al eliminar el médico:', error);
      throw error;
    }
  }

  static async actualizarMedico({ id, input }) {
    const { nombre } = input
    
    try {
      const resultado = await db.execute(
      `UPDATE medicos SET nombre = ? WHERE id = ?`,
      [nombre, id]
      )
      return resultado.rowsAffected
    } catch (error) {
      console.error('Error al actualizar el médico:', error);
      throw error;
    }
  }

}

