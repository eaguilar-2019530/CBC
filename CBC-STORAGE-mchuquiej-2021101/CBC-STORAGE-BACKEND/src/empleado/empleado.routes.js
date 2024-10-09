'use strict'

import { Router } from "express"
import { save, get, update, deleteEmpleado, search } from "./empleado.controller.js"
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=Router()

api.post('/agregarEmpleado', [validateJwt],  save)
api.get('/mostrarEmpleados', [validateJwt],  get)
api.put('/actualizarEmpleado/:id', [validateJwt],  update)
api.delete('/eliminarEmpleado/:id', [validateJwt],  deleteEmpleado)
api.post('/buscarEmpleado', [validateJwt],  search)

export default api