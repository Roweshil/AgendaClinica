import { ModeloMedico } from "../modelo/medico.modelo.js";

export class MedicoController {

    static async obtenerCitasPorMedico (req, res) {
        const { medicoId } = req.params;
        const citas = await ModeloMedico.obtenerCitasPorMedico(medicoId);
        if (!citas || citas.length === 0) {
            return res.status(404).json({ error: "No hay citas registradas" });
        }
        res.json(citas);
    }

    static async obtenerCitaPorId(req, res) {
        const { id } = req.params;
        const medico = await ModeloMedico.obtenerPorId(id);
        if (!medico) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.json(medico);
    }

    static async crearCita (req, res) {
        const newCita = await ModeloMedico.crearCita({ input: req.body })
        if (!newCita) {
            return res.status(400).json({ error: "Error al crear la cita" });
        }
        res.status(201).json(newCita)
    }

    static async eliminarCita (req, res) {
        const { id } = req.params;
        await ModeloMedico.eliminarCita({id});
        if (!id) {
            return res.status(404).json({ error: "Cita no encontrada" });
        }
        res.status(204).send()
    }

    static async actualizarCita (req, res) {
        const { id } = req.params;
        const updatedCita = await ModeloMedico.actualizarCita({ id, input: req.body });
        if (!updatedCita) {
            return res.status(400).json({ error: "Error al actualizar la cita" });
        }
        res.status(201).json(updatedCita);
    }
}