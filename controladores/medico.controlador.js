import { ModeloMedico } from "../modelo/medico.modelo.js";

export class MedicoController {
    static async getById(req, res) {
        const { id } = req.params;
        const medico = await ModeloMedico.obtenerPorId(id);
        res.json(medico);
    }
}