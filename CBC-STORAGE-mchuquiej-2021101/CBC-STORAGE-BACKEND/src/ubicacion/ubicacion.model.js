'use strict'

import mongoose from "mongoose"

const ubicacionSchema=mongoose.Schema({
    ubicacion:{
        type: String,
        required: true
    },
    capacidad:{
        type: Number,
        required: true
    }
})

export default mongoose.model('ubicacion', ubicacionSchema)