'use strict'
import express from 'express'
import { register, login, update, deleteAdmin, search } from './admin.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'

const api=express.Router()

api.post('/registrar', register)
api.post('/login', login)
api.put('/actualizarMiPerfil/:id'/* , [validateJwt], */, authenticateToken ,update)
api.delete('/eliminarMiPerfil/:id', [validateJwt], authenticateToken, deleteAdmin)
api.post('/buscarAdmin',[validateJwt], search)

export default api
