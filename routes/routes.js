import { Router } from "express";

import { AdminController } from "../controladores/admin.controlador.js";

export const adminRouter = Router();    

adminRouter.get('/', AdminController.obtenerTodos);

adminRouter.get('/:id', AdminController.obtenerPorId);

adminRouter.post('/', AdminController.crearMedico);
