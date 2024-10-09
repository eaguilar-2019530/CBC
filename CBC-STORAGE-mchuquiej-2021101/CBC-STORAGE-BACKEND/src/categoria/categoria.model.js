'use strict'

import mongoose from "mongoose"

const categoriaSchema=mongoose.Schema({
    categoria:{
        type: String,
        required: true
    }
})

export default mongoose.model('categoria', categoriaSchema)