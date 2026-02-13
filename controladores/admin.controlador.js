import { ModeloAdmin } from "../modelo/admin.modelo.js";
import { validateMedico, validatePartialMedico } from "../schemas/medicos.schema.js";

export class AdminController {
    static async obtenerTodos (req, res) {

        try {
            const admins = await ModeloAdmin.obtenerTodos()
            if (!admins || admins.length === 0) {
                return res.status(404).json({ error: "No hay médicos registrados" });
            }

            const safeUsers = admins.map(user => ({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
                // NUNCA incluyas: password, tokens, ips, datos internos...
            }));

            res.json({
                ok: true,
                count: safeUsers.length,
                users: safeUsers
            });
            
        } catch (error) {
            console.error('Error al obtener los médicos:', error)
            res.status(500).json({ error: "Error al obtener los médicos" })
        }
    }

    static async obtenerPorId (req, res) {
        const { id } = req.params;
        try {
            const admin =  await ModeloAdmin.obtenerPorId({id});
            if (!admin) {
                return res.status(404).json({ error: "Medico no encontrado" });
            }
            res.json(admin);
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


        try {
            const newMedico = await ModeloAdmin.crearMedico({ input: req.body })
            if (!newMedico) {
                return res.status(400).json({ error: "Error al crear el médico" })
            }

            res.status(201).json(newMedico)

        } catch (error) {
            console.error('Error al crear el médico:', error)
            res.status(500).json({ error: "Error al crear el médico" })
        }
    }

    static async eliminarMedico (req, res) {
        const { id } = req.params;
        
        try {
            const rowsAffected = await ModeloAdmin.eliminarMedico({id});
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

        const { id } = req.params

        try {
            const updatedMedico = await ModeloAdmin.actualizarMedico({ id, input: req.body });
            res.status(201).json(updatedMedico);
        } catch (error) {
            console.error('Error al actualizar el médico:', error)
            res.status(500).json({ error: "Error al actualizar el médico" })
        }
    }

}