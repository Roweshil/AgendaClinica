import { Router } from "express"

import { AdminController } from "../controladores/admin.controlador.js"

import { MedicoController } from "../controladores/medico.controlador.js"
import { AuthController } from "../controladores/auth.controlador.js"

export const medicoRouter = Router()

export const adminRouter = Router()

export const authRouter = Router()


// Rutas Publicas

authRouter.post('/login', AuthController.login)

// Rutas protegidas con middleware de autenticación y autorización
// Rutas para gestión de citas médicas

medicoRouter.get('/citas/consulta/', MedicoController.obtenerCitasPorMedico)

medicoRouter.get('/citas/consulta/:id', MedicoController.obtenerCitaPorId)

medicoRouter.post('/citas/crear', MedicoController.crearCita)

medicoRouter.delete('/citas/:id', MedicoController.eliminarCita)

medicoRouter.put('/citas/:id', MedicoController.actualizarCita)

// Rutas para administración de médicos

adminRouter.get('/', AdminController.obtenerTodos)

adminRouter.get('/:id', AdminController.obtenerPorId)

adminRouter.post('/', AdminController.crearMedico)

adminRouter.delete('/:id', AdminController.eliminarMedico)

adminRouter.put('/:id', AdminController.actualizarMedico)



// (Deshabilitadas temporalmente para pruebas)
 //authRouter.post('/register', AuthController.register)
