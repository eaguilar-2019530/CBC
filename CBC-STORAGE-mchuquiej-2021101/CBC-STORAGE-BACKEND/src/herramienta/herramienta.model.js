'use strict'

import mongoose from "mongoose"

const herramientaSchema=mongoose.Schema({
    SKU:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true
    },
    marca:{
        type: String,
        required: true
    },
    modelo:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true,
        default: 'Default'
    },
    ubicacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ubicacion',
        required: true,
        default: 'Default'
    }
})

export default mongoose.model('herramienta', herramientaSchema)