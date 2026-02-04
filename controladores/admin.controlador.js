import { ModeloAdmin } from "../modelo/admin.modelo.js";
import { validateMedico } from "../schemas/medicos.schema.js";
import { validatePartialMedico } from "../schemas/medicos.schema.js";

export class AdminController {
    static async obtenerTodos (req, res) {
        console.log("intento de acceso try");
        const admins = await ModeloAdmin.obtenerTodos()
        if (!admins || admins.length === 0) {
            return res.status(404).json({ error: "No hay médicos registrados" });
        }
        res.json(admins)   
    }

    static async obtenerPorId (req, res) {
        const { id } = req.params;
        const admin =  await ModeloAdmin.obtenerPorId({id});
        if (!admin) {
            return res.status(404).json({ error: "Medico no encontrado" });
        }
        res.json(admin);
    }

    static async crearMedico (req, res) {
        
        const result = validateMedico

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMedico = await ModeloAdmin.crearMedico({ input: req.body })
        res.status(201).json(newMedico)
        if (!newMedico) {
            return res.status(400).json({ error: "Error al crear el médico" });
        }
    }

    static async eliminarMedico (req, res) {
        const { id } = req.params;
        const rowsAffected = await ModeloAdmin.eliminarMedico({id});
        if (rowsAffected > 0) {
            res.status(204).send(console.log(rowsAffected))
        } else {
            res.status(404).send("Médico no encontrado")
        }
    }

    static async actualizarMedico (req, res) {
        const result = validatePartialMedico(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params;
        const updatedMedico = await ModeloAdmin.actualizarMedico({ id, input: req.body });
        res.status(201).json(updatedMedico);
    }

}