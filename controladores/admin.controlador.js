import { ModeloAdmin } from "../modelo/admin.modelo.js";

export class AdminController {
    static async obtenerTodos (req, res) {
        console.log("intento de acceso");
        const admins = await ModeloAdmin.obtenerTodos()
        res.json(admins)   
    }

    static async obtenerPorId (req, res) {
        const { id } = req.params;
        const admin =  await ModeloAdmin.obtenerPorId({id});
        res.json(admin);
    }

    static async crearMedico (req, res) {
        const newMedico = await ModeloAdmin.crearMedico({ input: req.body })
        res.status(201).json(newMedico)
    }

    static async eliminarMedico (req, res) {
        const { id } = req.params;
        await ModeloAdmin.eliminarMedico({id});
        res.status(204).send()
    }

    static async actualizarMedico (req, res) {
        const { id } = req.params;
        const updatedMedico = await ModeloAdmin.actualizarMedico({ id, input: req.body });
        res.status(201).json(updatedMedico);
    }

}