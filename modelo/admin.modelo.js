import { db } from "../DB/turso.js";

export class ModeloAdmin {

  static async obtenerTodos() {
    const resultado = await db.execute('SELECT * FROM medicos');
    return resultado.rows;
  }  
  static async obtenerPorId(id) {
    const resultado = await db.execute('SELECT * FROM medicos WHERE id = ?', [id]);
    return resultado.rows[0];
  }

  static async crearMedico({ input }) {
    const { nombre } = input;

    const resultado = await db.execute(
      `INSERT INTO medicos (nombre) VALUES (?)`,
      [nombre]
    );
  }
}