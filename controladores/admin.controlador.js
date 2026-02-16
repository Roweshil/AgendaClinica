import { ModeloAdmin } from "../modelo/admin.modelo.js"
import { validateMedico, validatePartialMedico, validatePasswordUpdate } from "../schemas/medicos.schema.js"

export class AdminController {
    static async obtenerTodos (req, res) {

        try {
            const medicos = await ModeloAdmin.obtenerTodos()
            if (!medicos || medicos.length === 0) {
                return res.status(404).json({ error: "No hay médicos registrados" })
            }

            const safeUsers = medicos.map(user => ({
                nombre: user.nombre,
                email: user.email,
            }))

            res.json({
                ok: true,
                count: safeUsers.length,
                users: safeUsers
            })
            
        } catch (error) {
            console.error('Error al obtener los médicos:', error)
            res.status(500).json({ error: "Error al obtener los médicos" })
        }
    }

    static async obtenerPorId (req, res) {

        const { id: medicoId } = req.params

        try {
            const medico =  await ModeloAdmin.obtenerPorId({medicoId})
            if (!medico) {
                return res.status(404).json({ error: "médico no encontrado" })
            }
            res.json(medico)
        } catch (error) {
            console.error('Error al obtener el médico por ID:', error)
            res.status(500).json({ error: "Error al obtener el médico por ID" })
        }
    }

    static async crearMedico (req, res) {
        
        const result = validateMedico(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        console.log('Resultado de la validación:', result)

        try {
            const newMedico = await ModeloAdmin.crearMedico({ input: result.data })
            if (!newMedico) {
                return res.status(400).json({ error: "Error al crear el médico " })
            }

            res.status(201).json(newMedico)

        } catch (error) {
            console.error('Error al crear el médico:', error)
            res.status(500).json({ error: error.message })
        }
    }

    static async actualizarContraseña (req, res) {
 

        const result = validatePasswordUpdate(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }


        try {

            const updatedMedico = await ModeloAdmin.actualizarContraseña({ input: result.data })
            res.status(201).json(updatedMedico)

        } catch (error) {
            console.error('Error al actualizar la contraseña:', error)
            res.status(500).json({ error: "Error al actualizar la contraseña" })
        }
    }

    static async eliminarMedico (req, res) {
        const { id: medicoId } = req.params
        
        try {
            const rowsAffected = await ModeloAdmin.eliminarMedico({medicoId})
            if (rowsAffected === 0) {
                res.status(404).send("Médico no encontrado")
            }
            res.status(204).send(console.log(rowsAffected))
        } catch (error) {
            console.error('Error al eliminar el médico:', error)
            res.status(500).json({ error: "Error al eliminar el médico" })
        }

    }

    static async actualizarMedico (req, res) {

        const result = validatePartialMedico(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id: uuid } = req.params

        try {
            const updatedMedico = await ModeloAdmin.actualizarMedico({ uuid, input: result.data })
            res.status(201).json(updatedMedico)
        } catch (error) {
            console.error('Error al actualizar el médico:', error)
            res.status(500).json({ error: "Error al actualizar el médico" })
        }
    }

}