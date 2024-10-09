'use strict'
import { Router } from "express"
import { save, get, update, deleteHerramienta, search, getHerramientasConDatos } from "./herramienta.controller.js"
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=Router()

api.post('/agregarHerramienta', /* [validateJwt], */  save)
api.get('/mostrarHerramientas', [validateJwt],  get)
api.put('/actualizarHerramienta/:id', [validateJwt],  update)
api.delete('/eliminarHerramienta/:id', [validateJwt],  deleteHerramienta)
api.post('/buscarHerramienta', [validateJwt],  search)
api.get('/herramientasConDatos', /* [validateJwt], */ getHerramientasConDatos)

export default api