'use strict'
import { Router } from "express"
import { save, get, update, deletePrestamo } from "./prestamo.controller.js"
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=Router()

api.post('/agregarPrestamo', /* [validateJwt], */ save)
api.get('/mostrarPrestamos', /* [validateJwt], */ get)
api.put('/actualizarPrestamo/:id', [validateJwt], update)
api.delete('/eliminarPrestamo/:id', [validateJwt], deletePrestamo)

export default api