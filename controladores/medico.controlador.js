import { ModeloMedico } from "../modelo/medico.modelo.js";

export class MedicoController {

    static async obtenerCitasPorMedico (req, res) {
        const { medicoId } = req.params;
        const citas = await ModeloMedico.obtenerCitasPorMedico(medicoId);
        res.json(citas);
    }

    static async obtenerCitaPorId(req, res) {
        const { id } = req.params;
        const medico = await ModeloMedico.obtenerPorId(id);
        res.json(medico);
    }

    static async crearCita (req, res) {
        const newCita = await ModeloMedico.crearCita({ input: req.body })
        res.status(201).json(newCita)
    }

    static async eliminarCita (req, res) {
        const { id } = req.params;
        await ModeloMedico.eliminarCita({id});
        res.status(204).send()
    }

    static async actualizarCita (req, res) {
        const { id } = req.params;
        const updatedCita = await ModeloMedico.actualizarCita({ id, input: req.body });
        res.status(201).json(updatedCita);
    }
}