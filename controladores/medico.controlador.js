import { ModeloMedico } from "../modelo/medico.modelo.js"
import { validateCita, validatePartialCita  } from "../schemas/citas.schema.js"

export class MedicoController {

    static async obtenerCitasPorMedico (req, res) {
        const { medicoId } = req.params
        try {
            const citas = await ModeloMedico.obtenerCitasPorMedico(medicoId)
            if (!citas || citas.length === 0) {
                return res.status(404).json({ error: "No hay citas registradas" })
            }
            res.json(citas)
        } catch (error) {
            console.error('Error al obtener las citas por médico:', error)
            res.status(500).json({ error: "Error al obtener las citas del médico" })
        }
    }

    static async obtenerCitaPorId(req, res) {
        const { id } = req.params;
        try {
            const medico = await ModeloMedico.obtenerPorId(id)
            if (!medico) {
                return res.status(404).json({ error: "Cita no encontrada" })
            }
            res.json(medico);
        } catch (error) {
            console.error('Error al obtener la cita por ID:', error)
            res.status(500).json({ error: "Error al obtener la cita por ID" })
        }
    }

    static async crearCita (req, res) {

        const result = validateCita(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        try {
            const newCita = await ModeloMedico.crearCita({ input: req.body })
            if (!newCita) {
                return res.status(400).json({ error: "Error al crear la cita" })
            }
            res.status(201).json(newCita)
        } catch (error) {
            console.error('Error al crear la cita:', error)
            res.status(500).json({ error: "Error al crear la cita" })
        }
    }

    static async eliminarCita (req, res) {
        const { id } = req.params
        try {
            const rowsAffected =await ModeloMedico.eliminarCita({id})
            if (rowsAffected === 0) {
                return res.status(404).json({ error: "Cita no encontrada" })
            }
            res.status(204).send(console.log(rowsAffected))
        } catch (error) {
            console.error('Error al eliminar la cita:', error)
            res.status(500).json({ error: "Error al eliminar la cita" })
        }
    }

    static async actualizarCita (req, res) {
        const result = validatePartialCita(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        try {
            
            const updatedCita = await ModeloMedico.actualizarCita({ id, input: req.body })
            if (updatedCita === 0) {
                return res.status(400).json({ error: "Error al actualizar la cita" })
            }
            res.status(201).json(updatedCita)
        } catch (error) {
            console.error('Error al actualizar la cita:', error)
            res.status(500).json({ error: "Error al actualizar la cita" })
        }
    }
}