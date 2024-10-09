'use strict'

import mongoose from "mongoose"

const prestamoSchema=mongoose.Schema({
    herramienta:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'herramienta',
        required: true
    },
    cantidadHerramientas:{
        type: Number,
        required: true
    },
    empleado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empleado',
        required: true
    },
    fechaPrestamo:{
        type: Date,
        required: true
    },
    fechaDevolucion:{
        type: Date
    },
    estado:{
        type: String,
        enum: ['NO DEVUELTO', 'DEVUELTO'], 
        required: true
    }
})

export default mongoose.model('prestamo', prestamoSchema)
