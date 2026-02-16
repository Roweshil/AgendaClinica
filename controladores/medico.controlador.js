import { ModeloMedico } from "../modelo/medico.modelo.js"
import { ModeloAdmin } from "../modelo/admin.modelo.js"
import { validateCita, validatePartialCita  } from "../schemas/citas.schema.js"

export class MedicoController {

    static async crearCita (req, res) {

        const result = validateCita(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const medicoId  = req.user.id

        try {
            const newCita = await ModeloMedico.crearCita({ medico_Id: medicoId, input: result.data })
            if (!newCita) {
                return res.status(400).json({ error: "Error al crear la cita" })
            }
            res.status(201).json(newCita)
        } catch (error) {
            console.error('Error al crear la cita:', error)
            res.status(500).json({ error: "Error al crear la cita i"})
        }
    }

    static async obtenerCitasPorMedico (req, res) {
        const medicoId = req.user.id

        console.log('USER:', req.user.id)

        const medico = await ModeloAdmin.obtenerPorId({medicoId})
        if (!medico) return res.status(404).json({ error: 'Usuario no existe' })
            
        try {
            const citas = await ModeloMedico.obtenerCitasPorMedico({medicoId})

            if (!citas || citas.length === 0) {
                return res.status(404).json({ error: "No hay citas registradas" })
            }

            const safeCitas = citas.map(cita => ({
                uuid: cita.uuid,
                fecha: cita.fecha,
                hora: cita.hora,
                paciente: cita.paciente,
                motivo: cita.motivo,
                estado: cita.estado,
                creacion: cita.created_at
            }))

            res.json({
                ok: true,
                count: safeCitas.length,
                users: safeCitas
            })

        } catch (error) {
            console.error('Error al obtener las citas por médico:', error)
            res.status(500).json({ error: "Error al obtener las citas del médico" })
        }
    }

    static async obtenerCitaPorId(req, res) {
        const medicoId  = req.user.id
        const { id: citaId } = req.params
       
        
        try {
            const cita = await ModeloMedico.obtenerCitaPorId({medicoId, citaId})
            
            if (!cita) {
                return res.status(404).json({ error: "Cita no encontrada" })
            }

            const safeCitas = [cita].map(cita => ({
                uuid: cita.uuid,
                fecha: cita.fecha,
                hora: cita.hora,
                paciente: cita.paciente,
                motivo: cita.motivo,
                estado: cita.estado,
                creacion: new Date(cita.created_at).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
            }))

            res.status(200).json({
                ok: true,
                count: safeCitas.length,
                users: safeCitas
            })
            
        } catch (error) {
            console.error('Error al obtener la cita por ID:', error)
            res.status(500).json({ error: "Error al obtener la cita por ID" })
        }
    }

    static async eliminarCita (req, res) {

        console.log('USER:', req.user)
        console.log('PARAMS:', req.params)
        const medicoId  = req.user.id
        const { id: citaId } = req.params

        try {
            const rowsAffected = await ModeloMedico.eliminarCita({medicoId, citaId})
            if (rowsAffected === 0) {
                return res.status(404).json({ error: "Cita no encontrada" })
            }
            res.status(204).send(console.log(rowsAffected))
        } catch (error) {
            console.error('Error al eliminar la cita c:', error)
            res.status(500).json({ error: "Error al eliminar la cita" })
        }
    }

    static async actualizarCita (req, res) {
        
        const result = validatePartialCita(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const medicoId  = req.user.id


        try {

            const { id: citaId } = req.params

            const cita = await ModeloMedico.obtenerCitaPorId({medicoId, citaId})
            if (!cita) {
                return res.status(404).json({ error: "Cita no encontrada" })
            }

            const rowsAffected = await ModeloMedico.actualizarCita({ citaId, medicoId, input: result.data })
            if (rowsAffected === 0) {
                return res.status(404).json({ error: "Error al actualizar la cita" })
            }
            res.status(200).json({
                ok: true,
                message: "Cita actualizada correctamente"
            })

        } catch (error) {
            console.error('Error al actualizar la cita:', error)
            res.status(500).json({ error: "Error al actualizar la cita controler" })
        }
    }
}