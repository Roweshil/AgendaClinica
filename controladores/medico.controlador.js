import { ModeloMedico } from "../modelo/medico.modelo.js"
import { validateCita, validatePartialCita  } from "../schemas/citas.schema.js"

export class MedicoController {

    static async obtenerCitasPorMedico (req, res) {
        const { id: uuid } = req.params
        try {
            const citas = await ModeloMedico.obtenerCitasPorMedico({ uuid})
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
        const { id: uuid } = req.params
        try {
            const medico = await ModeloMedico.obtenerPorId({uuid})
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
            const newCita = await ModeloMedico.crearCita({ input: result.data })
            if (!newCita) {
                return res.status(400).json({ error: "Error al crear la cita" })
            }
            res.status(201).json(newCita)
        } catch (error) {
            console.error('Error al crear la cita:', error)
            res.status(500).json({ error: "Error al crear la cita i"})
        }
    }

    static async eliminarCita (req, res) {
        const { id: uuid } = req.params
        try {
            const rowsAffected = await ModeloMedico.eliminarCita({uuid})
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

        const { id: uuid } = req.params
        console.log(req.params)

        try {
            
            const updatedCita = await ModeloMedico.actualizarCita({ uuid, input: result.data })
           
            res.status(201).json(updatedCita)
        } catch (error) {
            console.error('Error al actualizar la cita:', error)
            res.status(500).json({ error: "Error al actualizar la cita controler" })
        }
    }
}