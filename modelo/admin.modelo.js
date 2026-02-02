import { db } from "../DB/turso.js";

export class ModeloAdmin {

  static async obtenerTodos() {

    const resultado = await db.execute(
        'SELECT * FROM medicos'
    )

    return resultado.rows;
  }  

  static async obtenerPorId({ id }) {

    const resultado = await db.execute(
        'SELECT * FROM medicos WHERE id = ?', 
        [id]
    )

    return resultado.rows[ 0 ];
  }

  static async crearMedico({ input }) {
    const { nombre } = input

    try {
        const resultado = await db.execute(
        `INSERT INTO medicos (nombre) VALUES (?)`,
        [nombre]
        )

        return resultado.lastInsertRowid.toString()
    
    } catch (error) {
        console.error('Error al crear el médico:', error);
        throw error;
    }

    

  }

  static async eliminarMedico({ id }) {

    await db.execute(
      `DELETE FROM medicos WHERE id = ?`,
      [id]
    )
  }

  static async actualizarMedico({ id, input }) {
    const { nombre } = input
    const resultado = await db.execute(
      `UPDATE medicos SET nombre = ? WHERE id = ?`,
      [nombre, id]
    )
  }

}