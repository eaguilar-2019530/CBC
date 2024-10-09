'use strict'
import { Router } from "express"
import { save, get, update, deleteUbicacion, search } from "./ubicacion.controller.js"
import { validateJwt } from '../middlewares/validate-jwt.js'

const api=Router()

api.post('/agregarUbicacion',  [validateJwt],  save)
api.get('/mostrarUbicaciones',  [validateJwt],  get)
api.put('/actualizarUbicacion/:id',  [validateJwt],  update)
api.delete('/eliminarUbicacion/:id',  [validateJwt],  deleteUbicacion)
api.post('/buscarUbicacion',  [validateJwt],  search)

export default api