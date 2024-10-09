'use strict'

import { Router } from "express"
import { save, get, update, deleteCategoria, search } from "./categoria.controller.js"
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=Router()

api.post('/agregarCategoria', /* [validateJwt], */  save)
api.get('/mostrarCategorias', [validateJwt],  get)
api.put('/actualizarCategoria/:id', [validateJwt],  update)
api.delete('/eliminarCategoria/:id', [validateJwt],  deleteCategoria)
api.post('/buscarCategoria', [validateJwt],  search)

export default api