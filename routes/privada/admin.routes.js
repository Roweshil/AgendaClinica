// Rutas para administración de médicos
// Rutas protegidas con middleware de autenticación y autorización

import { Router } from "express"

import { AdminController } from "../../controladores/admin.controlador.js"


const adminRouter = Router()

adminRouter.get('/consulta', AdminController.obtenerTodos)

adminRouter.get('/consulta/:id', AdminController.obtenerPorId)

adminRouter.post('/crear', AdminController.crearMedico)

adminRouter.delete('/borrar/:id', AdminController.eliminarMedico)

adminRouter.patch('/actualizar/:id', AdminController.actualizarMedico)

export default adminRouter