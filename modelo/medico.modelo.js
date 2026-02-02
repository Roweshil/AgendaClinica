import { db } from '../../turso.js';

export class ModeloMedico {
  static async obtenerPorId(id) {
    const resultado = await db.prepare('SELECT * FROM medicos WHERE id = ?').bind(id).all();
    return resultado.rows[0]; 
  }
}